"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { marketingConfig } from "@/app/config/marketing";
import { siteConfig } from "@/app/config/site";
import { useScroll } from "@/app/hooks/useScroll";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { LogOutIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";
import { Icons } from "../shared/icons";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const selectedLayout = useSelectedLayoutSegment();
  const { setTheme, theme } = useTheme();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
      }`}
    >
      <section className="flex items-center justify-between py-4 container mx-auto">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1.5">
            <img
              src={
                theme === "light" ? "_static/logo.png" : "_static/logo-dark.png"
              }
              alt=""
              className="w-8 h-8 object-contain rounded-full mix-blend-multiply"
            />
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        {!isConnected ? (
          <w3m-button balance="hide" size="md" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else if (theme === "dark") {
                    setTheme("light");
                  }
                }}
              >
                {theme === "light" ? (
                  <div className="flex gap-2 items-center">
                    <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 w-4 h-4" />
                    <p>Toggle theme</p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Icons.moon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 w-4 h-4" />
                    <p>Toggle theme</p>
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  open();
                }}
              >
                <LogOutIcon className="w-4 h-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </section>
    </header>
  );
}
