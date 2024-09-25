import React from 'react'
import { useUserContext } from '@/context';
import { apiResponse } from '@/utils';
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { useState } from 'react';


export  function VerifyAccount() {

  const { user } = useUserContext()
    const [loading, setLoading] = React.useState<boolean>(false);

  console.log("verify user", user)

  
   

const verifyEmail = async () => {
  setLoading(true);

  try {
    const response = await apiResponse.post(`auth/verify-email`, {
      email: user?.email,
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
    }
  } catch (error: any) {
    console.log(error);

    if (error.response) {
      // Server responded with a status other than 200 range
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
    } else if (error.request) {
      // Request was made but no response was received
      enqueueSnackbar("No response from server. Please try again later.", {
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
    } else {
      // Something happened in setting up the request that triggered an Error
      enqueueSnackbar("An error occurred. Please try again.", {
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
  } finally {
    setLoading(false);
  }
};


  
  return (
    <div>
      <>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
        {/* Announcement Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-400">
          <div className=" px-4 py-1 sm:px-6 lg:px-8 mx-auto">
            {/* Grid */}
            <div className="flex justify-center  md:justify-between items-center gap-2">
              {!user?.emailVerified && (
                <div className=" text-end  md:order-2 md:flex md:justify-end w-full md:items-center">
                  <p className="me-5 inline-block text-sm font-semibold text-white">
                    Account not verified
                  </p>
                  <a
                    className="cursor-pointer py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border-2 border-white text-white hover:border-white/70 hover:text-white/70 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={verifyEmail}
                  >
                    Verify now
                  </a>
                </div>
              )}

              {/* End Col */}
              <div className="hidden md:block w-full">
                <div className="flex items-center w-full ">
                  <a
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm"
                    href="#"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch demo
                  </a>
                  <span className="inline-block border-e border-white/30 w-px h-5 mx-2" />
                  <a
                    className="py-2 px-3 inline-flex justify-center items-center gap-2 w-auto rounded-lg font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all text-sm"
                    href="#"
                  >
                    Explore what&apos;s new
                  </a>
                </div>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
        </div>
        {/* End Announcement Banner */}
      </>
    </div>
  );
}

export default VerifyAccount;