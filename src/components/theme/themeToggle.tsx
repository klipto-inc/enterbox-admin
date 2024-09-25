"use client";
import React, { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  // const [mode, setMode] = useState<string>("dark");

  // useEffect(() => {
  //   const theme: string = localStorage.getItem("theme") ?? "";
  //   if (theme === "dark") {
  //     setMode(theme);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (mode === "dark") {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [mode]);

  // const toggleTheme = () => {
  //   setMode(mode === "light" ? "dark" : "light");
  // };

  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border-transparent text-gray-800 disabled:opacity-50 disabled:pointer-events-none border border-gray-400 dark:text-white  transition-all duration-300 ease-in-out transform"
      data-hs-offcanvas="#hs-offcanvas-right "
    >
      {resolvedTheme === "dark" ? (
        // light mode icon
        <CiLight className="text-white text-2xl" />
      ) : (
        // dark mode icon
        <FaMoon className=" text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
