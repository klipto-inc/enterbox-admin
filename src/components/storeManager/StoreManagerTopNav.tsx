'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/resources/images/enterbox-logo.svg';
// import { Popover } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { CreateDialog } from '@/components';
export function GeneralStoreManagerTopNav() {
  const router = useRouter();

  const HanddleBack = () => {
    router.back();
  };
  return (
    <div className="  w-full  ">
      {/* ========== HEADER ========== */}
      <header className=" inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap  w-full dark:bg-[#1F2937] border-b text-sm py-1 sm:py-2  dark:border-gray-700 border-opacity-30">
        <nav
          className="flex basis-full items-center justify-between w-full mx-auto px-4 sm:px-6 md:px-8 "
          aria-label="Global"
        >
          <div className="me-5 lg:me-0 flex flex-row items-center gap-4">
            <svg
              onClick={HanddleBack}
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              fill="#ffffff"
              className="icon cursor-pointer"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                  fill=""
                />
              </g>
            </svg>

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

              <span className="flex-none text-xl hidden lg:block font-semibold dark:text-white">
                Store Manager
              </span>
            </Link>
          </div>
          <div className=" flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5 mr-8">
              <a
                className="font-medium text-white"
                href="#"
                aria-current="page"
              >
                Support
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="#"
              >
                Tutorials
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                href="#"
              >
                Templates
              </a>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-800 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Publish
              </button>
            </div>

            <div className="flex flex-row items-center justify-end gap-2">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700"
                >
                  <img
                    className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-gray-800"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      james@site.com
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      Newsletter
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      Purchases
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                        <path d="M12 12v9" />
                        <path d="m8 17 4 4 4-4" />
                      </svg>
                      Downloads
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Team Account
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
    </div>
  );
}

export default GeneralStoreManagerTopNav;
