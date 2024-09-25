import axios from "axios";

export const apiResponseFileUpload = axios.create({
  baseURL:
    process.env.NODE_ENV !== "production"
      ? process.env.NEXT_PUBLIC_LIVE_URL
      : process.env.NEXT_PUBLIC_LIVE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
