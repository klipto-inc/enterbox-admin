"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/resources/images/enterbox-logo.svg";
import { AuthTypes, RegexType } from "@/types";
import { EMAIL_REGEX, apiResponse } from "@/utils";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { Button } from "@/components/ui/button";
import NotSignedhoc from "@/helper/hoc/notSignedhoc";

const Page = () => {
  const [formData, setFormdata] = React.useState<AuthTypes>({
    email: "",
  });

  const [errorMsg, setErrorMsg] = React.useState<AuthTypes>({
    email: "",
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const validateSignup = (regexProps: RegexType) => {
    if (!regexProps.regex.test(regexProps.value)) {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        [regexProps.fieldname]: regexProps.errormsg,
      }));
    } else {
      setErrorMsg((prevErrorMsg) => ({
        ...prevErrorMsg,
        [regexProps.fieldname]: "",
      }));
    }
  };

  const allFieldsValid = Object.keys(errorMsg).every(
    (field) => !errorMsg[field as keyof typeof errorMsg]
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await apiResponse.post("auth/forgot-password", formData);

      if (response.status === 200) {
        enqueueSnackbar(`Password reset link has been sent to your email`, {
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
                  d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={12} cy={7} r={4} />
              </svg>
            </button>
          ),
        });

        setFormdata({
          email: "",
        });
      }
    } catch (error: any) {
      enqueueSnackbar(error?.response?.data.message, {
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
                d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </button>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-black">
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <div className="h-full flex flex-col justify-between min-h-screen items-center bg-BackgroundLight dark:bg-BackgroundDark px-4 py-12 sm:px-6 lg:px-8">
        <div className=""></div>
        <div className="w-full max-w-[470px] space-y-6 border border-gray-200 dark:border-neutral-700 py-10 px-6 md:px-6 lg:px-8 rounded-[14px] shadow-sm bg-BackgroundLight2 dark:bg-BackgroundDark2">
          <div className="flex justify-center">
            <Image
              src={Logo}
              className="h-12 w-12"
              alt="enterbox logo"
              height={200}
              width={200}
            />
          </div>
          <div>
            <h2 className="mt-6 text-center text-xl font-semibold tracking-tight text-foreground">
              Recover your account
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground text-gray-800 dark:text-gray-400">
              Enter the email address associated with your account and we{`'`}ll
              send you instructions to reset your password.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="w-full space-y-6">
              <div className="">
                <div className="relative border border-gray-200 dark:border-neutral-700 bg-BackgroundLight2 dark:bg-BackgroundDark2 rounded-lg">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={(event) => {
                      handleInputChange(event);
                      validateSignup({
                        fieldname: event.target.name,
                        value: event.target.value,
                        errormsg:
                          "Please include a valid email address to login",
                        regex: EMAIL_REGEX,
                      });
                    }}
                    className="py-3 px-4 ps-11 block w-full border border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-transparent"
                    placeholder="Enter email"
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                    <svg
                      className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                  </div>
                </div>
                {errorMsg.email && formData.email && (
                  <span
                    className="text-xs text-[#E11C49] mt-2"
                    id="email-error"
                  >
                    {errorMsg.email}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={!allFieldsValid || loading}
                className={`inline-flex font-normal items-center justify-center text-center gap-3 w-full px-4 py-2 text-base bg-[#E11C49] dark:bg-[#E11C49] text-gray-200 dark:text-gray-200 hover:bg-[#9c2642] hover:dark:bg-[#9c2642] hover:text-gray-200 hover:dark:text-gray-200 ${
                  allFieldsValid
                    ? "cursor-pointer bg-[#E11C49]"
                    : "cursor-not-allowed bg-[#9c2642]"
                } text-white transition-all rounded-md ${
                  loading ? "cursor-not-allowed bg-[#9c2642]" : "bg-[#E11C49]"
                }`}
              >
                Continue
                {loading && (
                  <svg
                    className="c-button-spinner -ml-1 mr-3 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth={4}
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </Button>
            </div>
          </form>
          <hr className="flex-grow border-t border-gray-400 dark:border-neutral-700 opacity-20" />

          <div className="text-center text-sm text-muted-foreground">
            Remember your login details?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-primary underline"
              prefetch={false}
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-5 ">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            This site is protected by reCAPTCHA and Enterbox{" "}
            <a
              href="#"
              title=""
              className="text-TextLight1 dark:text-TextDark1 underline transition-all duration-200 hover:underline hover:text-blue-700"
            >
              Privacy Policy
            </a>{" "}
            &amp;
            <a
              href="#"
              title=""
              className="text-TextLight1 ml-1 dark:text-TextDark1 underline transition-all duration-200 hover:underline hover:text-blue-700"
            >
              Terms of Service
            </a>
          </p>
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-800 dark:text-gray-400 text-center">
              ©2024 Enterbox. A product of{" "}
              <a
                className="text-gray-800 dark:text-white font-medium hover:text-blue/80 mr-1"
                href="../index.html"
              >
                Klipto Inc.
              </a>
              - All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
