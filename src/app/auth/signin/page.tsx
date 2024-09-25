"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/resources/images/enterbox-logo.svg";
import { AuthTypes, RegexType } from "@/types";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  apiResponse,
  serverUrlSocket,
} from "@/utils";

import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { NewEmailListContextProvider, useUserContext } from "@/context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import cookie from "js-cookie";
import NotSignedhoc from "@//helper/hoc/notSignedhoc";
import dynamic from "next/dynamic";
const LoginSocialGoogle = dynamic(
  () => import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle),
  { ssr: false }
);

const Page = () => {
  const { fetchCurrentUser } = useUserContext();
  const [formData, setFormdata] = React.useState<AuthTypes>({
    email: "",
    password: "",
  });

  const [errorMsg, seterrorMsg] = React.useState<AuthTypes>({
    email: "",
    password: "",
  });



  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [loading2, setLoading2] = React.useState<boolean>(false);

  const handleInputChange = (Event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = Event.target;

    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const { push } = useRouter();

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

  const HandleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiResponse.post("auth/login", formData, {
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 200) {
        enqueueSnackbar("Logged in Successfully", {
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

        const longerEXP = 1000 * 60 * 60 * 24 * 30;

        cookie.set("aToken", response.data.token, {
          expires: new Date(Date.now() + longerEXP),
          // secure: true,
          // sameSite: "strict",
        });

        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error?.message);

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

  const handleGoogleSignIn = async (provider: string, data: any) => {
    setLoading2(true);
    console.log("data", data);

    const Formdata = {
      email: data.email,
      username: data.name,
      userdp: data.picture,
      password: data.sub + data.email,
    };

    if (data.email_verified === true) {
      try {
        const response = await apiResponse.post("auth/google", Formdata, {
          withCredentials: true,
        });

        console.log(response);
        if (response.status === 200) {
          enqueueSnackbar("Logged in Successfully", {
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

          const longerEXP = 1000 * 60 * 60 * 24 * 30;

          cookie.set("aToken", response.data.token, {
            expires: new Date(Date.now() + longerEXP),
            // secure: true,
            // sameSite: "strict",
          });

          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }
      } catch (error: any) {
        setLoading2(false);
        console.log(error?.message);

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
        setLoading2(false);
      }
    }
  };

  return (
    <section className="bg-BackgroundLight dark:bg-BackgroundDark">
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <div className="h-full flex flex-col min-h-screen items-center justify-between bg-BackgroundLight dark:bg-BackgroundDark px-4 py-12 sm:px-6 lg:px-8 ">
        <div className=""></div>
        <div className="w-full max-w-[470px] space-y-5 border border-gray-200 dark:border-neutral-700 py-10 px-6 md:px-6 lg:px-8 rounded-[14px] shadow-sm bg-BackgroundLight2 dark:bg-BackgroundDark2">
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
              Sign In to Enterbox
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground text-gray-800 dark:text-gray-400">
              Welcome back! Please sign in to continue
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-primary underline"
              prefetch={false}
            >
              Sign Up
            </Link>
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
                    type="email"
                    name="email"
                    required
                    onChange={(Event: React.ChangeEvent<HTMLInputElement>) => {
                      handleInputChange(Event);
                      let regexprops: RegexType = {
                        fieldname: Event.target.name,
                        value: Event.target.value,
                        errormsg:
                          "Please include a valid email address to login",
                        regex: EMAIL_REGEX,
                      };
                      SignupValidate(regexprops);
                    }}
                    className="py-3 px-4 ps-11 block w-full border  border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-transparent"
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
          <div className="flex flex-row items-center gap-2">
            <hr className="flex-grow border-t border-neutral-700 dark:border-neutral-500 opacity-20" />
            <span className="bg-background px-2 text-gray-500 dark:text-gray-400">
              Or sign in with
            </span>
            <hr className="flex-grow border-t border-neutral-700 dark:border-neutral-500 opacity-20" />
          </div>

          <LoginSocialGoogle
            client_id={process.env.NEXT_PUBLIC_GG_APP_ID || ""}
            redirect_uri={`${window.location.origin}/auth/google/callback`}
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="online"
            onLoginStart={() => {
              setLoading2(true);
              return false;
            }}
            onResolve={({ provider, data }: any) => {
              handleGoogleSignIn(provider, data);
            }}
            onReject={(err: any) => {
              console.log(err);
              setLoading2(false);
            }}
            className="btn_LoginWithGoogle"
          >
            {/* <GoogleLoginButton /> */}
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="flex flex-row items-center justify-center w-full px-4 py-1.5 text-sm font-normal text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
              >
                <div className=" inset-y-0 left-0 px-1">
                  <svg
                    className="h-6 w-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="800px"
                    height="800px"
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                  >
                    {" "}
                    <title>Google-color</title>{" "}
                    <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                    <g
                      id="Icons"
                      stroke="none"
                      strokeWidth={1}
                      fill="none"
                      fillRule="evenodd"
                    >
                      {" "}
                      <g
                        id="Color-"
                        transform="translate(-401.000000, -860.000000)"
                      >
                        {" "}
                        <g
                          id="Google"
                          transform="translate(401.000000, 860.000000)"
                        >
                          {" "}
                          <path
                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                            id="Fill-1"
                            fill="#FBBC05"
                          >
                            {" "}
                          </path>{" "}
                          <path
                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                            id="Fill-2"
                            fill="#EB4335"
                          >
                            {" "}
                          </path>{" "}
                          <path
                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                            id="Fill-3"
                            fill="#34A853"
                          >
                            {" "}
                          </path>{" "}
                          <path
                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                            id="Fill-4"
                            fill="#4285F4"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </svg>
                </div>
                Google
                {loading2 && (
                  <svg
                    className="c-button-spinner ml-3 mr-3 h-4 w-4 animate-spin text-gray-800"
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
              </button>
            </div>
          </LoginSocialGoogle>
          <div className="text-center text-sm text-muted-foreground">
            <Link
              href="/auth/recover"
              className="font-medium text-primary underline"
              prefetch={false}
            >
              Forgot password?
            </Link>
          </div>
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
};

export default Page;
