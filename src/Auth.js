import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Config from "./Config";
function Auth() {
  const [auth, setAuth] = useState(false);
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function changeValue(e) {
    const prop = e.target.name;
    const value = e.target.value;

    const newCredentials = { ...credentials };
    newCredentials[prop] = value;

    setCredentials(newCredentials);
  }
  async function login() {
    setIsLoading(true);
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
    setIsLoading(false);
    if (status == 403) {
      setError("Autenticação inválida");
      return;
    }

    const jsonData = await response.json();
    console.log("setAuth ##### login", jsonData);
    setAuth((prev) => jsonData.token);
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
    console.log("setAuth ##### setInvalidToken");
    setAuth(false);
  }

  useEffect(() => {
    const authStorage = JSON.parse(
      localStorage.getItem("@mob_landpage_f0552434361ccf7da13bdece6f1efddc")
    );
    if (authStorage && authStorage != "") {
      setAuth((prev) => authStorage);
    }
  }, []);

  if (auth) {
    return <Config setInvalidAuth={setInvalidToken} token={auth} />;
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

        <Button
          w="full"
          colorScheme="red"
          onClick={login}
          isDisabled={isLoading}
          colorScheme={isLoading ? "gray" : "red"}
        >
          Login
        </Button>
        <Text color="red">{error}</Text>
      </Stack>
    </Stack>
  );
}

export default Auth;
