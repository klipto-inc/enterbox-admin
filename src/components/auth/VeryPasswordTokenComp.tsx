"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { apiResponse } from "@/utils";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";
import Loading from "@/utils/Loading";
import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
export function VerifyPassowrdTokenComp() {
  const { get } = useSearchParams();
  const token = get("resetToken");

  const [loading, setLoading] = React.useState(false);
  const [verifymessage, setverifymessage] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  React.useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await apiResponse.post(
          `auth/verifypasswordresetoken`,
          {
            token: token,
          }
        );

        const data = response.data;

        if (response.status === 200) {
          console.log("data", data);
          setLoading(false);
          setverifymessage(data?.message);
          setTimeout(() => {
            router.push(`/auth/updatepassword?token=${token}`);
          }, 1000);
          return;
        } else {
          setLoading(false);
          
          alert(data.message);
          setTimeout(() => {
            router.push("/auth/recover");
          }, 1000);
          return;
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        setTimeout(() => {
          setError(error?.response?.data.message);
        }, 200);
      }
    };

    verifyEmail();
  }, [token, router]);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center  min-h-[100dvh] overflow-hidden w-full bg-black">
          <Loading />
        </div>
      ) : verifymessage ? (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Verified Successfully
            </h1>
            <p className="mt-4 text-muted-foreground">
              You can now update your password.
            </p>
            <div className="mt-6">
              <Link
                href={`/auth/updatepassword?token=${token}`}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Update Password
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Opps, Link has Expired
            </h1>
            <p className="mt-4 text-muted-foreground">
              You need to request for a new verification link.
            </p>
            <div className="mt-6">
              <Link
                href={`/auth/updatepassword?token=${token}`}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Back to recovery
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyPassowrdTokenComp;
