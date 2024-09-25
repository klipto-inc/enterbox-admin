import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context";

export function UserNav() {
      const { user, loading } = useUserContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button className="h-auto w-auto cursor-pointer outline-none border-none">
            {loading ? (
              <div className="inline-block size-[38px] rounded-full ring-2 ring-white dark:ring-gray-800"></div>
            ) : (
              user?.userdp && (
                <div className="relative inline-block ">
                  <img
                    className="inline-block size-[35px] rounded-full dark:bg-BackgroundLight  bg-BackgroundDark border-[1px]"
                    src={user.userdp}
                    alt="Image Description"
                  />
                  <span className="absolute bottom-0 end-0 block size-2 rounded-full ring-2 ring-white bg-teal-400 dark:ring-neutral-900 " />
                </div>
              )
            )}
          </button>
      
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{ user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground italic">
            {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
