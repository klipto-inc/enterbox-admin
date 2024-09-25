"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context";
import Loading from "@/utils/Loading";
import cookie from "js-cookie";

function NotSignedhoc(Component: React.ComponentType<any>) {
  return function Hoc(props: any) {
    const { user, loading, setLoading } = useUserContext();
    const router = useRouter();
    const aToken = cookie.get("aToken");

    if (!loading) {
      if (aToken && user === null) {
        router.push("/auth/signin");
      } else if (aToken && user) {
        router.push("/dashboard");
      }
    }

    if (!user) {
      return <Component {...props} />;
    }

    return (
      <div className="flex justify-center items-center min-h-[100dvh] overflow-hidden w-full bg-black">
        <Loading />
      </div>
    );
  };
}

export default NotSignedhoc;
