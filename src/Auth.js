import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Config from "./Config";
function Auth() {
  const [auth, setAuth] = useState(false);
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");

  function changeValue(e) {
    const prop = e.target.name;
    const value = e.target.value;

    const newCredentials = { ...credentials };
    newCredentials[prop] = value;

    setCredentials(newCredentials);
  }
  async function login() {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: credentials.user, pass: credentials.pass }),
    };
    const response = await fetch(
      "https://owa4t6eb4mlyrrvmxnn4vtusm40mjjih.lambda-url.us-east-2.on.aws/auth",
      options
    );
    const status = await response.status;
    if (status == 403) {
      setError("Autenticação inválida");
      return;
    }

    const jsonData = await response.json();

    setAuth(jsonData);
    localStorage.setItem(
      "@mob_landpage_f0552434361ccf7da13bdece6f1efddc",
      JSON.stringify(jsonData.token)
    );
  }

  function setInvalidToken() {
    localStorage.setItem(
      "@mob_landpage_f0552434361ccf7da13bdece6f1efddc",
      null
    );
    setAuth(false);
  }

  useEffect(() => {
    // localStorage.setItem("items", JSON.stringify(items));
    const authStorage = JSON.parse(
      localStorage.getItem("@mob_landpage_f0552434361ccf7da13bdece6f1efddc")
    );
    if (authStorage && authStorage != "") {
      setAuth(authStorage);
    }
  }, []);

  if (auth) {
    return <Config setInvalidAuth={setInvalidToken} token={auth?.token} />;
  }
  return (
    <Stack spacing={3} width={"100%"} alignItems="center">
      <Stack alignItems="center" width={300}>
        <Stack alignItems="left" width={"100%"}>
          <Text>Login</Text>
          <Input
            key="user"
            name="user"
            onChange={(event) => changeValue(event)}
          />
        </Stack>
        <Stack alignItems="left" width={"100%"}>
          <Text>Senha</Text>
          <Input
            key="pass"
            name="pass"
            type="password"
            onChange={(event) => changeValue(event)}
          />
        </Stack>
        <Button w="full" colorScheme="red" onClick={login}>
          Login
        </Button>
        <Text color="red">{error}</Text>
      </Stack>
    </Stack>
  );
}

export default Auth;
