"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context";
import HashLoader from "react-spinners/HashLoader";

function bizReghoc(Component: React.ComponentType<any>) {
  return function Hoc(props: any) {
    const { user, loading } = useUserContext();

    console.log("this is user", user);

    const router = useRouter();
    const colors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
    ]; // Add more colors as needed
    const [currentColor, setCurrentColor] = React.useState(colors[0]);
    const [colorIndex, setColorIndex] = React.useState(0);

    React.useEffect(() => {
      if (user && !user.business) {
        console.log("User is not a business, redirecting to add business");
      }
      else if (user && user.business) {
        console.log("User is not a business, redirecting to /dashboard");
        router.push(`/dashboard`);
      } else {
        console.log("User is not null, redirecting to /dashboard");
         router.push("/auth/signin");
      }
    }, [user, loading, router]);

    React.useEffect(() => {
      const colorChangeInterval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      }, 1000); // Change color every second

      return () => clearInterval(colorChangeInterval);
    }, [colors.length]);

    React.useEffect(() => {
      setCurrentColor(colors[colorIndex]);
    }, [colorIndex, colors]);

    if (loading) {
      // Optionally render a loading state while user context is being fetched
      return (
        <div>
          <HashLoader
            color={currentColor}
            size={30}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      );
    }

    if (user) {
      return <Component {...props} />;
    }

    // Optionally render nothing while redirecting
    return (
      <div>
        <HashLoader
          color={currentColor}
          size={30}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  };
}

export default bizReghoc;
