// custom api with baseURL
import axios from 'axios';
import cookie from "js-cookie";

const aToken = cookie.get("aToken");
const Api = axios.create({
    baseURL: 'https://enterbox-server-enh8aqg0fyegbag0.eastus-01.azurewebsites.net',
headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + aToken,
    },
});
export default Api;   
