import axios from "axios";
import cookie from "js-cookie";

const aToken = cookie.get("aToken");


export const apiResponseFileUpload = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LIVE_URL
      : process.env.NEXT_PUBLIC_LOCAL_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: "Bearer " + aToken,
  },
});
