"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context";
import cookie from "js-cookie";

function Signedhoc(Component: React.ComponentType<any>) {
  return React.memo(function Hoc(props: any) {
    const { user, loading } = useUserContext();
    const router = useRouter();
    const aToken = cookie.get("aToken");

    if (!loading) {
      if (!aToken && user === null) {
        console.log("No token or session, redirecting to /auth/signin");
        router.push("/auth/signin");
        return;
      } 
    }

    if (user) {
      return <Component {...props} />;
    }

    return null; // Render nothing while redirecting
  });
}

export default Signedhoc;
