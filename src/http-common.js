import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});