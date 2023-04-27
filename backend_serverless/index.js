const AWS = require("aws-sdk");
const S3 = new AWS.S3({ region: "us-east-1", apiVersion: "2012-10-17" });

const jwt = require("jsonwebtoken");

const TIME_JWT_EXPIRES = process.env.TIME_JWT_EXPIRES ?? 36000;
const S3_BUCKET = process.env.TIME_JWT_EXPIRES ?? 'reacts3teste';

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
 * Validar login e senha do usuário
 * @param {string} objeto {login , senha}
 * @returns boolean
 */
const authCredentials = async ({ login, pass }) => {
  if (login === "admin" && pass === "admin") {
    return true;
  }
  return false;
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
  
  const responseUnauthorized = {
    statusCode: 403,
    body: body,
  };
  const responseSuccess = {
    statusCode: 200,
    body: null,
  };
  
  const base64 = body?.file ?? false;

  const bearerToken = headers?.authorization ?? false;
  const imageType = body?.['imageType'] ?? false;
  const imageName = body?.['imageName'] ?? false;
  console.log('upload bearerToken', bearerToken)
  // console.log('upload bearerToken', bearerToken, imageType, imageName)
  // if (!bearerToken) {
  if (!bearerToken || !imageType || !imageName) {
    return responseUnauthorized;
  }
  const token = bearerToken.split(" ")[1];

  try {
    const tokenIsValid = await validJWT(token);
    if (tokenIsValid) {
      console.log("token is valid");
      try {

        const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        
        const params = {
          Bucket: S3_BUCKET,
          Key: imageName, // type is not required
          Body: base64Data,
          ContentEncoding: 'base64', // required
          ContentType: imageType // required. Notice the back ticks
        }
        console.log(params)
        
        await putObjectToS3(null, null, params);
        
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
  
  
}

module.exports.handler = async (event) => {
  const rawPath = event?.rawPath ?? null;
  const body = JSON.parse(event.body);
  const headers = event.headers;
  console.log(rawPath)

  if (rawPath == "/auth") {
    const response = await auth(body);
    return response;
  } else if (rawPath == "/save") {
    const response = await save({ headers, body });
    console.log("response", response);
    return response;
  } else if (rawPath == "/upload") {
    const response = await upload(body,headers);
    return response;
  } else {
    const response = {
      statusCode: 403,
      body: JSON.stringify(event),
    };
    return response;
  }
};
