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

export function UpdatepasswordComp() {
  const router = useRouter();
  const params = useSearchParams();
  const Token = params.get("token");
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
    console.log(formData);
  }, [formData]);

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
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 h-screen xl:overflow-hidden">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8 order-last lg:order-first">
          <div className="absolute inset-0">
            <img
              className="object-cover w-full h-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                One more step to go,&nbsp;
                <br className="hidden xl:block" />
                you are the<i className="text-[#E11C49]">&nbsp;Boss!</i>.
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Commercial License{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Unlimited Exports{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    120+ Coded Blocks{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Design Files Included{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[90vh] lg:h-auto px-4 py-10 bg-BackgroundLight dark:bg-BackgroundDark sm:px-6 lg:px-8 sm:py-16 lg:py-24 order-first lg:order-last">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <div className="flex flex-row items-center gap-4 mb-4">
              <Link
                className="flex items-center gap-2 justify-start"
                href="/dashboard"
                aria-label="Brand"
              >
                <Image
                  src={Logo}
                  className="h-12 w-12"
                  alt="enterbox logo"
                  height={200}
                  width={200}
                />
              </Link>
              <h2 className="text-2xl md:text-3xl  font-bold leading-tight text-TextLight1 dark:text-TextDark1 sm:text-4xl">
                Update password
              </h2>
            </div>

            <form
              action="#"
              method="POST"
              className="mt-8"
              onSubmit={HandleSubmit}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-TextLight2 dark:text-TextDark2"
                  >
                    {" "}
                    New Password{" "}
                  </label>
                  <div className="mt-2.5 relative text-TextLight2 dark:text-TextDark2 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      required
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        handleInputChange(event);
                        const regexProps: RegexType = {
                          fieldname: "password",
                          regex: PASSWORD_REGEX,
                          value: event.target.value,
                          errormsg: "8+ characters required",
                        };
                        SignupValidate(regexProps);
                      }}
                      placeholder="Enter your password"
                      className="block w-full py-3 pl-10 pr-4 text-white placeholder-gray-500 transition-all duration-200 border border-BorderLight dark:border-BorderDark border-opacity-[90%] rounded-md bg-BackgroundLight2 dark:bg-BackgroundDark2 focus:outline-none  focus:bg-BackgroundLight2 focus:dark:bg-BackgroundDark2"
                    />
                  </div>
                </div>
                {errorMsg.password && formData.password && (
                  <p className=" text-xs text-[#E11C49] mt-2" id="password-error">
                    {errorMsg.password}
                  </p>
                )}
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-TextLight2 dark:text-TextDark2"
                  >
                    {" "}
                    Confirm New Password{" "}
                  </label>
                  <div className="mt-2.5 relative text-TextLight2 dark:text-TextDark2 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      required
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
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
                      className="block w-full py-3 pl-10 pr-4 text-white placeholder-gray-500 transition-all duration-200 border border-BorderLight dark:border-BorderDark border-opacity-[90%] rounded-md bg-BackgroundLight2 dark:bg-BackgroundDark2 focus:outline-none  focus:bg-BackgroundLight2 focus:dark:bg-BackgroundDark2"
                    />
                  </div>

                  <p className=" text-xs text-[#E11C49] mt-2">
                    {confirmpassword}
                  </p>
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={!allfieldvalid || loading}
                    className={`inline-flex items-center justify-center text-center gap-3 w-full px-4 py-3 text-base ${
                      allfieldvalid
                        ? "cursor-pointer bg-[#9c2642]"
                        : " cursor-not-allowed bg-red-950"
                    }   font-semibold text-white transition-all   rounded-md   ${
                      loading ? "cursor-not-allowed bg-red-950 " : "bg-[#9c2642]"
                    }  `}
                  >
                    Update
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
                  </button>
                </div>
              </div>
            </form>

            <hr className="bg-BackgroundLight2 dark:bg-BackgroundDark2 opacity-20 my-4" />

            <p className="mt-5 text-sm text-gray-600">
              This site is protected by reCAPTCHA and the Google{" "}
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
                className="text-TextLight1 dark:text-TextDark1 underline transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div> */}

      <div className="h-full flex flex-col justify-between min-h-screen items-center justify-center bg-BackgroundLight dark:bg-BackgroundDark px-4 py-12 sm:px-6 lg:px-8">
        <div className=""></div>
        <div className="w-full max-w-[470px] space-y-6 border border-gray-200 dark:border-neutral-700 py-10 px-6 md:px-6 lg:px-8 rounded-[14px] shadow-sm bg-BackgroundLight dark:bg-BackgroundDark">
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
                <div className="relative">
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
                    className="py-3 px-4 ps-11 block w-full border border-gray-200 dark:border-neutral-700 dark:bg-BackgroundDark2 bg-BackgroundLight2 border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-transparent"
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
                <div className="relative">
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
                    className="py-3 px-4 ps-11 block w-full border border-gray-200 dark:border-neutral-700 dark:bg-BackgroundDark2 bg-BackgroundLight2 border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-transparent"
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
                className={`inline-flex font-normal items-center justify-center text-center gap-3 w-full px-4 py-2 text-base bg-[#9c2642] dark:bg-[#9c2642] text-gray-200 dark:text-gray-200  hover:bg-red-900 hover:dark:bg-red-900 hover:text-gray-200 hover:dark:text-gray-200 ${
                  allfieldvalid
                    ? "cursor-pointer bg-[#9c2642]"
                    : " cursor-not-allowed bg-red-950"
                }    text-white transition-all   rounded-md   ${
                  loading ? "cursor-not-allowed bg-red-950 " : "bg-[#9c2642]"
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

        <p className="mt-5 text-sm text-gray-600 text-center">
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
      </div>
    </section>
  );
}

export default UpdatepasswordComp;
