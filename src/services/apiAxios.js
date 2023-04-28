import axios from "axios";

export default axios.create({
  baseURL:
    "https://owa4t6eb4mlyrrvmxnn4vtusm40mjjih.lambda-url.us-east-2.on.aws",
  headers: {
    "Content-type": "application/json",
  },
});
