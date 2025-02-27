"use client";

import Image from "next/image";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import { useTheme } from "next-themes";

export default function PreviewLanding() {
  const { theme } = useTheme();

  return (
    <div className="pb-6 sm:pb-16">
      <MaxWidthWrapper>
        <div className="rounded-xl md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative aspect-video overflow-hidden rounded-xl border md:rounded-lg">
            <Image
              className="size-full object-cover object-center dark:opacity-85"
              src={
                theme === "light"
                  ? "/_static/main-light.png"
                  : "/_static/main.png"
              }
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
