import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  rootElement
);
