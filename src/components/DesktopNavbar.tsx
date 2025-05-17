"use client";

import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";

function DesktopNavbar() {
  const { user } = useUser();

  // Custom class for gradient hover
  const gradientHover =
    "hover:bg-gradient-to-r hover:from-purple-700 hover:via-purple-400 hover:to-fuchsia-500 hover:text-white transition-all duration-200";

  return (
    <div className="hidden md:flex items-center space-x-4">
      {/* No gradient on ModeToggle */}
      <div className="rounded-full p-1">
        <ModeToggle />
      </div>

      <Button
        variant="ghost"
        className={`flex items-center gap-2 ${gradientHover}`}
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button
            variant="ghost"
            className={`flex items-center gap-2 ${gradientHover}`}
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center gap-2 ${gradientHover}`}
            asChild
          >
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          {/* No gradient on UserButton */}
          <div className="rounded-full p-1">
            <UserButton />
          </div>
        </>
      ) : (
        // No gradient on Sign In button
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;
