"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMe, useLogout } from "@/features/auth/auth.hook";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Brand } from "../common/Brand";
import { Separator } from "../ui/separator";

const Header = () => {
  const { data: user } = useMe();
  const { mutate: logout, isPending } = useLogout();

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-white px-4 py-3 shadow-md md:px-10 lg:px-20">
      <Brand className="text-xl" />

      {user?.data && (
        <div className="flex h-full gap-4">
          <Separator orientation="vertical" className="border" />
          <Popover>
            <PopoverTrigger asChild>
              <button className="cursor-pointer focus:outline-none">
                <Avatar className="h-8 w-8 border-2">
                  <AvatarImage src={user.data.candidate?.avatar} />
                  <AvatarFallback className="bg-primary-surface text-primary-main text-sm font-semibold">
                    {getInitials(user.data.email)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="end">
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.data.candidate?.avatar} />
                    <AvatarFallback className="bg-primary-surface text-primary-main font-semibold">
                      {getInitials(user.data.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {user.data.candidate?.fullName || "User"}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {user.data.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => logout()}
                  loading={isPending}
                >
                  <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </header>
  );
};

export default Header;
