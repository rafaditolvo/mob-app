import axios from "axios";

export default axios.create({
  baseURL:
    "https://u3stwz7llzycc7vspi2acrxbfq0nguvl.lambda-url.us-east-1.on.aws",
  headers: {
    "Content-type": "application/json",
  },
});
