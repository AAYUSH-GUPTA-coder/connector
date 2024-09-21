import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="https://twitter.com/your_twitter_handle"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 rounded-full"
          )}
          target="_blank"
        >
          <span className="mr-3">🚀</span>
          <span className="hidden md:flex">Introducing&nbsp;</span> CrossChain
          Yield Amplifier
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Amplify your yields with{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            CrossChain Boost
          </span>
        </h1>
        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Unlock higher returns with seamless cross-chain integration, designed
          to optimize your yield strategies with minimal effort.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/dashboard"
            prefetch={true}
            className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full")}
          >
            <span>Start Connecting</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          {/* <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "px-5 rounded-full"
            )}
          >
            <p>
              <span className="hidden sm:inline-block">Start Blooping</span>
            </p>
          </Link> */}
        </div>
      </div>
    </section>
  );
}
