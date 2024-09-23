"use client";

import Link from "next/link";

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
                <AvatarImage src="https://imgs.search.brave.com/MOmgOwZ8ZwntZ0vdSXusl4C_L52d04HwmfM7igDtJ-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtd2l4bXAtZWQz/MGE4NmI4YzRjYTg4/Nzc3MzU5NGMyLndp/eG1wLmNvbS9mLzhh/NTFjNDkxLTQzZTMt/NGE1NS04MzY5LWU2/NmEyYzE2MDNiOS9k/ZWY5YzU3LWUwYjRk/N2EyLTFhY2ItNDky/YS05ZjdhLTE1NGEx/YmVkMjY1Zi5qcGcv/djEvZmlsbC93XzI1/MCxoXzI1MCxxXzcw/LHN0cnAvcGl4ZWxf/cG9ydHJhaXRfYnlf/ZzBycmFfZGVmOWM1/Ny0yNTB0LmpwZz90/b2tlbj1leUowZVhB/aU9pSktWMVFpTENK/aGJHY2lPaUpJVXpJ/MU5pSjkuZXlKemRX/SWlPaUoxY200NllY/QndPamRsTUdReE9E/ZzVPREl5TmpRek56/TmhOV1l3WkRReE5X/VmhNR1F5Tm1Vd0lp/d2lhWE56SWpvaWRY/SnVPbUZ3Y0RvM1pU/QmtNVGc0T1RneU1q/WTBNemN6WVRWbU1H/UTBNVFZsWVRCa01q/WmxNQ0lzSW05aWFp/STZXMXQ3SW1obGFX/ZG9kQ0k2SWp3OU1U/STRNQ0lzSW5CaGRH/Z2lPaUpjTDJaY0x6/aGhOVEZqTkRreExU/UXpaVE10TkdFMU5T/MDRNelk1TFdVMk5t/RXlZekUyTUROaU9W/d3ZaR1ZtT1dNMU55/MWxNR0kwWkRkaE1p/MHhZV05pTFRRNU1t/RXRPV1kzWVMweE5U/UmhNV0psWkRJMk5X/WXVhbkJuSWl3aWQy/bGtkR2dpT2lJOFBU/RXlPREFpZlYxZExD/SmhkV1FpT2xzaWRY/SnVPbk5sY25acFky/VTZhVzFoWjJVdWIz/QmxjbUYwYVc5dWN5/SmRmUS51bW5ENnBh/b01temw1Z0V3UV9B/U0RReWFLSGJSUGhz/aENYa0ZkOVYxU08w" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>iamharsh.eth</DropdownMenuLabel>
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