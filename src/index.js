import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import App from "./App";
import Config from "./Config";

const rootElement = document.getElementById("root");
const baseURI = rootElement.baseURI;

const ROUTE_SCREEN_CONFIG = "authconfig";
const route = baseURI.substring(baseURI.length - 10, baseURI.length);

const configScreen = route === ROUTE_SCREEN_CONFIG ? true : false;
console.log(route, configScreen);
ReactDOM.render(
  <ChakraProvider>
    {!configScreen && <App />}
    {configScreen && <Config />}
  </ChakraProvider>,
  rootElement
);
