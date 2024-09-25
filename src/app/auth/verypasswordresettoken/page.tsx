"use client";
import VerifyPassowrdTokenComp from "@/components/auth/VeryPasswordTokenComp";
import Loading from "@/utils/Loading";
import React from "react";
import HashLoader from "react-spinners/HashLoader";
export default function Page() {
  return (
    <div>
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[100dvh] overflow-hidden w-full bg-black">
            <Loading />
          </div>
        }
      >
        <VerifyPassowrdTokenComp />
      </React.Suspense>
    </div>
  );
}
