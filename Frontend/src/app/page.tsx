import { Grid } from "@/components/sections/grid";
import HeroLanding from "@/components/sections/hero-landing";
import PreviewLanding from "@/components/sections/preview-landing";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroLanding />
      <PreviewLanding />
      <Grid />
    </div>
  );
}
