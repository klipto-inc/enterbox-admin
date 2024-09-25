'use client';
import { Popover, Transition } from '@headlessui/react';
import React from 'react';
export function CreateDialog() {
  const handleClickInsideContent = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };
  return (
    <div
      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 shadow-md rounded-lg p-2 dark:bg-BackgroundDark bg-BackgroundLight dark:border border-transparent"
      aria-labelledby="hs-dropdown-with-header"
      onClick={handleClickInsideContent}
    >
      <div className=" hs-dropdown-open:opacity-100">
        <label htmlFor="icon" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
            <svg
              className="flex-shrink-0 size-4 text-gray-400"
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
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="text"
            id="icon"
            name="icon"
            className="py-2 px-4 ps-11 block w-full rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-BackgroundDark2 bg-BackgroundLight2 border-BorderLight dark:border-BorderDark dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="mt-2 py-2 first:pt-0 last:pb-0">
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="#"
        >
          <svg
            className="flex-shrink-0 size-5"
            width={24}
            height={24}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="CurrentColor"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <defs>
                {" "}
                <style
                  dangerouslySetInnerHTML={{
                    __html: ".cls-1{fill:#0000004009a;}.cls-2{fill:#00000;}",
                  }}
                />{" "}
              </defs>{" "}
              <g data-name="2. Health Message" id="_2._Health_Message">
                {" "}
                <path
                  className="cls-1"
                  d="M31.5,10.14,27.6,7.2a1,1,0,0,0-1.2,1.6L29.32,11,16.59,20.33a1,1,0,0,1-1.18,0L2.68,11,5.6,8.8A1,1,0,0,0,4.4,7.2L.5,10.14A1,1,0,0,0,0,11V29a3,3,0,0,0,3,3H29a3,3,0,0,0,3-3V11A1,1,0,0,0,31.5,10.14ZM30,29a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V13l12.23,9a3,3,0,0,0,3.54,0L30,13Z"
                />{" "}
                <path
                  className="cls-1"
                  d="M5,28a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l4-4a1,1,0,0,1,1.42,1.42l-4,4A1,1,0,0,1,5,28Z"
                />{" "}
                <path
                  className="cls-1"
                  d="M27,28a1,1,0,0,1-.71-.29l-4-4a1,1,0,0,1,1.42-1.42l4,4a1,1,0,0,1,0,1.42A1,1,0,0,1,27,28Z"
                />{" "}
                <path
                  className="cls-1"
                  d="M16,16a8,8,0,1,1,8-8A8,8,0,0,1,16,16ZM16,2a6,6,0,1,0,6,6A6,6,0,0,0,16,2Z"
                />{" "}
                <path
                  className="cls-2"
                  d="M19,7H17V5a1,1,0,0,0-2,0V7H13a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V9h2a1,1,0,0,0,0-2Z"
                />{" "}
              </g>{" "}
            </g>
          </svg>
          Newsletter
        </a>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="#"
        >
          <svg
            className="flex-shrink-0 size-[22px]"
            width={24}
            height={24}
            xmlns="http://www.w3.org/2000/svg"
            fill="CurrentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.5 7h-17v10.71c0 .48.27.79.5.79h16c.23 0 .5-.31.5-.79V7zM4 4h16c1.1 0 2 1.02 2 2.29V17.7c0 1.27-.9 2.29-2 2.29H4c-1.1 0-2-1.02-2-2.29V6.3C2 5.02 2.9 4 4 4zm8.5 10.86a3.5 3.5 0 00-1-6.86h-3a3.5 3.5 0 00-.5 6.96v-1.39a2.14 2.14 0 01.54-4.21h2.92a2.14 2.14 0 011.04 4.01v1.49zM16 10a3.5 3.5 0 01-.5 6.96h-3a3.5 3.5 0 01-1-6.85v1.45a2.16 2.16 0 001.03 4.06h2.94a2.16 2.16 0 00.53-4.25V10z"
            />
          </svg>
          Website
        </a>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="#"
        >
          <svg
            className="flex-shrink-0 size-5"
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
          Subscribers
        </a>
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="flex-shrink-0 size-[22px]"
            width={24}
            height={24}
            fill="transparent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
            />
          </svg>
          Automation
        </a>
      </div>
    </div>
  );
}
export default CreateDialog;
