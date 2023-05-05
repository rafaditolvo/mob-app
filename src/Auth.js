import { SpinnerIcon } from "@chakra-ui/icons";
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
    if (credentials.user.length < 5 || credentials.pass.length < 5) {
      // setTimeout(() => {
      setError("Autenticação inválida");
      setIsLoading(false);
      // }, 500);

      return;
    }
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
    setError(false);
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

  function tokenExpired(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const { exp } = JSON.parse(atob(base64));
    const unixTimeNow = new Date().getTime();
    return exp * 1000 < unixTimeNow;
  }

  useEffect(() => {
    const authStorage = JSON.parse(
      localStorage.getItem("@mob_landpage_f0552434361ccf7da13bdece6f1efddc")
    );
    if (authStorage && authStorage != "") {
      if (tokenExpired(authStorage)) {
        console.log("venceu");
        setInvalidToken();
      } else {
        setAuth((prev) => authStorage);
      }
    }
  }, []);

  if (auth) {
    return (
      <Config
        setInvalidAuth={setInvalidToken}
        token={auth}
        tokenExpired={tokenExpired}
      />
    );
  }
  return (
    <Stack spacing={3} width={"100%"} alignItems="center">
      <Stack
        alignItems="center"
        width={400}
        height="80vh"
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack
          background="gray.700"
          width={"100%"}
          p={8}
          color={"gray.100"}
          rounded={16}
        >
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
          <Text color="red" textAlign={"center"}>
            {error}
          </Text>
          <Stack pt={error ? 0 : 4}>
            <Button
              w="full"
              colorScheme="red"
              onClick={login}
              isDisabled={isLoading}
              colorScheme={isLoading ? "gray" : "red"}
            >
              {isLoading ? <SpinnerIcon /> : "Login"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Auth;
