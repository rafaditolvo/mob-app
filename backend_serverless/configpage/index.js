const AWS = require("aws-sdk");
const S3 = new AWS.S3({ region: "us-east-1", apiVersion: "2012-10-17" });
// Create the DynamoDB service object
var DynamoDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const { hash, compare } = require("bcryptjs");

const TIME_JWT_EXPIRES = process.env.TIME_JWT_EXPIRES ?? 3600;
const S3_BUCKET = process.env.TIME_JWT_EXPIRES ?? "reacts3teste";
const DYNAMODB_TABLE_USERS = process.env.DYNAMODB_TABLE_USERS ?? "mob_users";
const DIRECTORY_STATIC = process.env.DIRECTORY_STATIC ?? "static/media/";

/**
 *
 * @param {string} data body json
 * @param {string} nameOfFile
 * @returns Promise<void>
 */
const putObjectToS3 = async (data, nameOfFile, paramsFile = null) =>
  new Promise((resolve, reject) => {
    var s3 = new AWS.S3();
    var params = {
      Bucket: S3_BUCKET,
      Key: nameOfFile + ".json",
      Body: data,
    };
    s3.putObject(paramsFile ? paramsFile : params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject();
      } else {
        console.log("Put to s3 should have worked: " + data); // successful response
        resolve();
      }
    });
  });

/**
 *
 * @param {headers, body} objeto
 * @returns {number,null}
 */
const save = async ({ headers, body }) => {
  console.log("{ headers, body }", { headers, body });
  const responseUnauthorized = {
    statusCode: 403,
    body: null,
  };
  const responseSuccess = {
    statusCode: 200,
    body: null,
  };

  const bearerToken = headers?.authorization ?? false;
  if (!bearerToken) {
    return responseUnauthorized;
  }
  const token = bearerToken.split(" ")[1];
  console.log("token", token);

  try {
    const tokenIsValid = await validJWT(token);
    if (tokenIsValid) {
      console.log("token is valid");
      try {
        await putObjectToS3(JSON.stringify(body), "data");
      } catch (errPutObjectToS3) {
        return {
          statusCode: 400,
          body: JSON.stringify(errPutObjectToS3),
        };
      }
    }
  } catch (e) {
    console.log(e);
    return responseUnauthorized;
  }
};

/**
 * Validar token JWT
 * @param {string} token Bearer token
 * @returns Promise<{auth,message} | login>
 */
const validJWT = async (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err)
        reject({ auth: false, message: "Failed to authenticate token.", err });

      const login = decoded.login;
      resolve(login);
    });
  });

/**
 * Get DynamoDB credentials
 * @param {string} objeto {login}
 * @returns boolean
 */
const getCredentialDynamoDB = async (login) =>
  new Promise((resolve, reject) => {
    const params = {
      TableName: DYNAMODB_TABLE_USERS,
      Key: {
        login: { S: login },
      },
      ProjectionExpression: "pass",
    };
    DynamoDB.getItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });

/**
 *
 * @param {headers, body} objeto
 * @returns {number,null}
 */
const isAuth = async (headers) => {
  console.log("isAuth", headers);
  const responseUnauthorized = {
    statusCode: 403,
    body: null,
  };
  const responseSuccess = {
    statusCode: 200,
    body: null,
  };

  const bearerToken = headers?.authorization ?? false;

  console.log("isAuth bearerToken", bearerToken);
  if (!bearerToken) {
    return responseUnauthorized;
  }
  const token = bearerToken.split(" ")[1];

  try {
    const tokenIsValid = await validJWT(token);
    console.log("isAuth tokenIsValid", tokenIsValid);
    if (tokenIsValid) {
      return responseSuccess;
    } else {
      return responseUnauthorized;
    }
  } catch (e) {
    return responseUnauthorized;
  }
};

/**
 * Validar login e senha do usuário
 * @param {string} objeto {login , senha}
 * @returns boolean
 */
const authCredentials = async ({ login, pass }) => {
  try {
    const passDynDB = await getCredentialDynamoDB(login);
    console.log("passDynDB", passDynDB.pass.S);
    const passwordMatch = await compare(pass, passDynDB.pass.S);
    console.log("passwordMatch", passwordMatch);
    if (passwordMatch) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("authCredentials err", err);
    return false;
  }
};

/**
 * Gerar token JWT
 * @param {string} login login enviado
 * @returns {auth:boolean, token:string}
 */
const generateToken = async (login) => {
  const token = jwt.sign({ login }, process.env.JWT_SECRET, {
    expiresIn: TIME_JWT_EXPIRES,
  });
  return { auth: true, token };
};

/**
 *
 * @param {} objeto {login, pass}
 * @returns {statusCode<number>, body<string|null>}
 */
const auth = async ({ login, pass }) => {
  const credentialsIsValid = await authCredentials({ login, pass });

  if (credentialsIsValid) {
    const token = await generateToken(login);
    const response = {
      statusCode: 200,
      body: JSON.stringify(token),
    };
    return response;
  }

  const response = {
    statusCode: 403,
    body: null,
  };
  return response;
};

const upload = async (body, headers) => {
  const base64 = body?.file ?? false;

  const bearerToken = headers?.authorization ?? false;
  const imageType = body?.["imageType"] ?? false;
  const imageName = body?.["imageName"] ?? false;

  const fileSplitedName = imageName.split(".");
  const fileName = `${DIRECTORY_STATIC}${fileSplitedName[0]}-${randomUUID()}.${
    fileSplitedName[fileSplitedName.length - 1]
  }`;

  const responseUnauthorized = {
    statusCode: 403,
    body: body,
  };
  const responseSuccess = {
    statusCode: 200,
    body: fileName,
  };

  if (!bearerToken || !imageType || !imageName || !base64) {
    return responseUnauthorized;
  }
  const token = bearerToken.split(" ")[1];

  try {
    const tokenIsValid = await validJWT(token);
    if (tokenIsValid) {
      try {
        const base64Data = new Buffer.from(
          base64.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );

        const params = {
          Bucket: S3_BUCKET,
          Key: fileName, // type is not required
          Body: base64Data,
          ContentEncoding: "base64", // required
          ContentType: imageType, // required. Notice the back ticks
        };
        console.log(params);

        await putObjectToS3(null, null, params);
        return responseSuccess;
      } catch (errPutObjectToS3) {
        console.log("errorr S3", errPutObjectToS3);
        return {
          statusCode: 400,
          body: JSON.stringify(errPutObjectToS3),
        };
      }
    }
  } catch (e) {
    console.log(e);
    return responseUnauthorized;
  }
};

module.exports.handler = async (event) => {
  const rawPath = event?.rawPath ?? null;
  const body = JSON.parse(event.body);
  const headers = event.headers;

  // console.log("hash", await hash("admin", 10));

  if (rawPath == "/auth") {
    const response = await auth(body);
    return response;
  } else if (rawPath == "/isauth") {
    const response = await isAuth(headers);
    return response;
  } else if (rawPath == "/save") {
    const response = await save({ headers, body });
    console.log("response", response);
    return response;
  } else if (rawPath == "/upload") {
    const response = await upload(body, headers);
    return response;
  } else {
    const response = {
      statusCode: 404,
      body: JSON.stringify({}),
    };
    return response;
  }
};
