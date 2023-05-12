import { DownloadIcon, EditIcon, SpinnerIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Config from "./Config";

import logo from "../src/img/mob_logo_black.svg";

function Auth() {
  const [auth, setAuth] = useState(false);
  const [isEditScreen, setIsEditScreen] = useState(false);
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const monthTextList = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const dateNow = new Date();
  const monthNumberNow = dateNow.getMonth();
  const yearNumberNow = dateNow.getFullYear();
  const textOptionNow = `${monthTextList[monthNumberNow]} / ${yearNumberNow}`;
  const valueOptionNow = `${yearNumberNow}${
    monthNumberNow + 1 < 10 ? "0" + (monthNumberNow + 1) : monthNumberNow + 1
  }`;

  const [monthRefValue, setMonthRefValue] = useState(valueOptionNow);

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
    setAuth(false);
  }

  function tokenExpired(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const { exp } = JSON.parse(atob(base64));
    const unixTimeNow = new Date().getTime();
    return exp * 1000 < unixTimeNow;
  }

  function handleMonthRef(e) {
    setMonthRefValue(e.target.value);
  }

  async function downloadCSV() {
    setIsLoading(true);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify({ monthRef: monthRefValue }),
    };
    const response = await fetch(
      "https://owa4t6eb4mlyrrvmxnn4vtusm40mjjih.lambda-url.us-east-2.on.aws/exportcsv",
      options
    );
    const status = await response.status;
    if (status == 403) {
      setInvalidToken();
      return;
    } else if (status == 200) {
      const csv = await response.text();

      const element = document.createElement("a");
      const file = new Blob([csv], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${monthRefValue}_${
        new Date().toISOString().replaceAll("T", " ").split(".")[0]
      }.csv`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      document.body.removeChild(element);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    const authStorage = JSON.parse(
      localStorage.getItem("@mob_landpage_f0552434361ccf7da13bdece6f1efddc")
    );
    if (authStorage && authStorage != "") {
      if (tokenExpired(authStorage)) {
        setInvalidToken();
      } else {
        setAuth((prev) => authStorage);
      }
    }
  }, []);

  if (auth) {
    if (isEditScreen) {
      return (
        <Config
          setInvalidAuth={setInvalidToken}
          token={auth}
          tokenExpired={tokenExpired}
          backMenu={() => setIsEditScreen(false)}
        />
      );
    }

    return (
      <Stack spacing={3} width={"100%"} alignItems="center">
        <Stack
          alignItems="center"
          width={"40vw"}
          height="80vh"
          justify={{ base: "center", md: "center" }}
          align={{ base: "center", md: "center" }}
        >
          <Image src={logo} boxSize="5em" />
          <HStack background="gray.700" width={"100%"} p={8} rounded={16}>
            <VStack
              alignItems="center"
              width={"100%"}
              justify={{ base: "center", md: "center" }}
              align={{ base: "center", md: "center" }}
            >
              <Select bg="teal" color="white" onChange={handleMonthRef}>
                <option key={`month_now`} value={`${valueOptionNow}`}>
                  {textOptionNow}
                </option>
                {Array.from(Array(12).keys()).map((_, index) => {
                  const date = new Date(
                    dateNow.setMonth(dateNow.getMonth() - 1)
                  );
                  const monthNumber = date.getMonth();
                  const yearNumber = date.getFullYear();
                  const textOption = `${monthTextList[monthNumber]} / ${yearNumber}`;
                  const valueOption = `${yearNumber}${
                    monthNumber + 1 < 10
                      ? "0" + (monthNumber + 1)
                      : monthNumber + 1
                  }`;
                  return (
                    <option key={`month_${index}`} value={`${valueOption}`}>
                      {textOption}
                    </option>
                  );
                })}
              </Select>
              <Button
                w="full"
                h="12vw"
                onClick={downloadCSV}
                isDisabled={isLoading}
                colorScheme="teal"
                isLoading={isLoading}
              >
                <VStack
                  alignItems="center"
                  width={"100%"}
                  justify={{ base: "center", md: "center" }}
                  align={{ base: "center", md: "center" }}
                >
                  <DownloadIcon w={"30%"} h={"30%"} color="white" />
                  <Text color={"white"}>Download CSV</Text>
                </VStack>
              </Button>
            </VStack>
            <Button
              w="full"
              h="16vw"
              colorScheme="red"
              onClick={() => setIsEditScreen(true)}
              isDisabled={isLoading}
              colorScheme="gray"
            >
              <VStack
                alignItems="center"
                width={"100%"}
                justify={{ base: "center", md: "center" }}
                align={{ base: "center", md: "center" }}
              >
                <EditIcon w={"30%"} h={"30%"} color="gray.700" />
                <Text color={"gray.700"}>Editar</Text>
              </VStack>
            </Button>
          </HStack>
        </Stack>
      </Stack>
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
