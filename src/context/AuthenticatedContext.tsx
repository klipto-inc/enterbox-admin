"use client";
import React from "react";
import { apiResponse } from "@/utils";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/utils/Loading";
import cookie from "js-cookie";
export interface User {
  _id: string;
  username: string;
  email: string;
  userdp: string;
  emailVerified: boolean;
  createdAt: number;
  updatedAt: number;
  __v: number;
  business: {
    businessName: string;
    businessLogo: string;
    businessDescription: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
  };
}

interface AuthenticatedContextInt {
  user: User | null;
  setuser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCurrentUser: () => Promise<void>;
}

const AuthenticatedContext = React.createContext<AuthenticatedContextInt>(
  {} as AuthenticatedContextInt
);

export function AuthenticatedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setuser] = React.useState<User | null>(null);
  const [googleUser, setGoogleUser] = React.useState(null);
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);

  const aToken = cookie.get("aToken");

  const fetchCurrentUser = async () => {
    setLoading(true);

    try {
        const response = await apiResponse.get(`user/active-admin`);

      if (response.status === 200) {
        setuser(response.data.user);
        console.log("User data fetched:", response.data.user);
      }
      else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100dvh] overflow-hidden w-full bg-black">
        <Loading />
      </div>
    );
  }

  return (
    <AuthenticatedContext.Provider
      value={{ user, setuser, fetchCurrentUser, loading, setLoading }}
    >
      {" "}
      {children}
    </AuthenticatedContext.Provider>
  );
}

export function useUserContext() {
  if (AuthenticatedContext === undefined) {
    throw new Error(
      "Authenticated context cannot be used outside of the provider"
    );
  }
  return React.useContext(AuthenticatedContext);
}
