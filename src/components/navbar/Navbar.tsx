"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/resources/images/enterbox-logo.svg";
import { Popover } from "@headlessui/react";
import { useUserContext } from "@/context";
import { User } from "@/context";
import { CreateDialog } from "@/components";
import ThemeToggle from "../theme/themeToggle";
import { Search } from "@/components/dashboard/component/search";
import TeamSwitcher from "@/components/dashboard/component/team-switcher";
import { MainNav } from "@/components/dashboard/component/main-nav";
import { UserNav } from "@/components/dashboard/component/user-nav";
import { ModeToggle } from "../theme/NextTheme";
export function Navbar() {
  const { user, loading } = useUserContext();


  // const { username, _id, email, emailVerified, userdp } = user as User ;
  return (
    <div className="border-b sticky top-0 z-30 bg-black border-[#27272A]">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
