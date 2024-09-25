"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/resources/images/enterbox-logo.svg";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AuthTypes, RegexType } from "@/types";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { EMAIL_REGEX, PASSWORD_REGEX, apiResponse } from "@/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const Token = params.get("token");


  console.log("token")
  const [formData, setFormdata] = React.useState({
    password: "",
    confirmpassword: "",
  });
  const [errorMsg, seterrorMsg] = React.useState({
    password: "",
    confirmpassword: "",
  });

  const [confirmpassword, setConfirmpassword] = useState("");

  const handleInputChange = (Event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = Event.target;

    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const SignupValidate = (regexprops: RegexType) => {
    if (!regexprops.regex.test(regexprops.value)) {
      seterrorMsg((errorprops) => ({
        ...errorprops,
        [regexprops.fieldname]: regexprops.errormsg,
      }));
    } else {
      seterrorMsg((errorprops) => ({
        ...errorprops,
        [regexprops.fieldname]: "",
      }));
    }
  };

  const allfieldvalid = Object.keys(errorMsg).every(
    (field) => !errorMsg[field as keyof typeof errorMsg]
  );

  React.useEffect(() => {
    if (!Token) {
      router.push('/auth/recover')
    }
  }, []);

  const [loading, setLoading] = React.useState<boolean>(false);

  const HandleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    console.log({ newPassword: formData.password, token: Token });
    setLoading(true);
    try {
      const response = await apiResponse.post("auth/updatepassword", {
        newPassword: formData.password,
        token: Token,
      });
      const User = response?.data;
      if (response.status === 200) {
        enqueueSnackbar(`password updated successfully`, {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },

          action: (key) => (
            <button onClick={() => closeSnackbar(key)}>
              {" "}
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className=""
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
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      enqueueSnackbar(error?.response?.data.message, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },

        action: (key) => (
          <button onClick={() => closeSnackbar(key)}>
            {" "}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className=""
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-BackgroundLight dark:bg-BackgroundDark">
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
              Update password
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground text-gray-800 dark:text-gray-400">
              Your email has been verified. Please enter a new password.
            </p>
          </div>
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={HandleSubmit}
          >
            <div className="w-full space-y-6">
              <div className="">
                <div className="relative border border-gray-200 dark:border-neutral-700 bg-BackgroundLight2 dark:bg-BackgroundDark2 rounded-lg">
                  <input
                    type="password"
                    required
                    name="password"
                    onChange={(Event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(Event);
                      const regexProps: RegexType = {
                        fieldname: "password",
                        regex: PASSWORD_REGEX,
                        value: Event.target.value,
                        errormsg: "8+ characters required",
                      };
                      SignupValidate(regexProps);
                    }}
                    className="py-3 px-4 ps-11 block w-full border  border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-transparent"
                    placeholder="Enter password"
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
                      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                      <circle cx="16.5" cy="7.5" r=".5" />
                    </svg>
                  </div>
                </div>
                {errorMsg.password && formData.password && (
                  <span
                    className=" text-xs text-[#E11C49] mt-2"
                    id="password-error"
                  >
                    {errorMsg.password}
                  </span>
                )}
              </div>

              <div className="">
                <div className="relative border border-gray-200 dark:border-neutral-700 bg-BackgroundLight2 dark:bg-BackgroundDark2 rounded-lg">
                  <input
                    type="password"
                    required
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(event);
                      const regexProps: RegexType = {
                        fieldname: "password",
                        regex: PASSWORD_REGEX,
                        value: event.target.value,
                        errormsg: "",
                      };
                      SignupValidate(regexProps);
                    }}
                    name="confirmpassword"
                    placeholder="Confirm your password"
                    className="py-3 px-4 ps-11 block w-full border  border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-transparent"
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
                      <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
                      <circle cx="16.5" cy="7.5" r=".5" />
                    </svg>
                  </div>
                </div>
                {errorMsg.password && formData.password && (
                  <span
                    className=" text-xs text-[#E11C49] mt-2"
                    id="password-error"
                  >
                    {errorMsg.password}
                  </span>
                )}
              </div>
            </div>

            <div>
              <Button
                // className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                type="submit"
                disabled={!allfieldvalid || loading}
                className={`inline-flex font-normal items-center justify-center text-center gap-3 w-full px-4 py-2 text-base bg-[#E11C49] dark:bg-[#E11C49] text-gray-200 dark:text-gray-200  hover:bg-[#9c2642] hover:dark:bg-[#9c2642] hover:text-gray-200 hover:dark:text-gray-200 ${
                  allfieldvalid
                    ? "cursor-pointer bg-[#E11C49]"
                    : " cursor-not-allowed bg-[#9c2642]"
                }    text-white transition-all   rounded-md   ${
                  loading ? "cursor-not-allowed bg-[#9c2642]" : "[#E11C49]"
                }  `}
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
                      strokeWidth="4"
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
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-5 ">
          <p className="text-sm text-gray-600  dark:text-gray-400 text-center">
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
              className="text-TextLight1 ml-1  dark:text-TextDark1 underline transition-all duration-200 hover:underline hover:text-blue-700"
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
              - All right reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
