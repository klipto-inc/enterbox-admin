"use client";
import React, { useEffect } from "react";
import { apiResponse } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const verificationToken = params.get("token");
  const [message, setMessage]=useState("loading....")



  useEffect(() => {
    const verifyingEmail = async () => {
      try {
        const response = await apiResponse.post(`auth/verify-email`, {
          verificationToken,
        });

        if (response.status === 200 || response.status === 201) {
          enqueueSnackbar(response.data.message, {
            variant: "success",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            action: (key) => (
              <button onClick={() => closeSnackbar(key)}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ),
          });
        } else if (response.status === 401) {
          enqueueSnackbar(response.data.message, {
            variant: "success",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            action: (key) => (
              <button onClick={() => closeSnackbar(key)}>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ),
          });
        }
      } catch (error: any) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          action: (key) => (
            <button onClick={() => closeSnackbar(key)}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-9-9m0 0L3 3m9 9l9-9m-9 9l-9 9"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ),
        });
      }
    };

    if (verificationToken) {
      verifyingEmail();
    }
  }, [verificationToken]);

  return (
    <div>
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
      loading
    </div>
  );
 
};

export default VerifyEmail;
