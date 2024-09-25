import axios from "axios";
import cookie from "js-cookie";

const aToken = cookie.get("aToken");

export const apiResponse = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_LIVE_URL
      : process.env.NEXT_PUBLIC_LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + aToken,
  },
  withCredentials: true, // Include credentials with the request
});

export const clientUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_LIVE_CLIENT_URL
    : process.env.NEXT_PUBLIC_LOCAL_CLIENT_URL;

export const serverUrlSocket =
  process.env.NODE_ENV !== "production"
    ? process.env.NEXT_PUBLIC_LIVE_SOCKET_URL
    : process.env.NEXT_PUBLIC_LOCAL_SOCKET_URL;
