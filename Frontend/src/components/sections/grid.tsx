import {
  ArrowRightIcon,
  BarChartIcon,
  LayersIcon,
  LightningBoltIcon,
  LockClosedIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
  {
    Icon: RocketIcon,
    name: "Yield Amplification",
    description:
      "Boost your returns through our advanced cross-chain strategies. Boost your returns through our advanced cross-chain strategies. Boost your returns through our advanced cross-chain strategies. Boost your returns through our advanced cross-chain strategies.",
    href: "/how-it-works",
    cta: "Learn more",
    background: (
      <img
        src="/placeholder.svg?height=200&width=200"
        alt=""
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: LayersIcon,
    name: "Multi-Chain Support",
    description:
      "Seamlessly interact with multiple blockchains for optimal yield.",
    href: "/supported-chains",
    cta: "Explore chains",
    background: (
      <img
        src="/placeholder.svg?height=200&width=200"
        alt=""
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: LightningBoltIcon,
    name: "Automated Rebalancing",
    description:
      "Our AI constantly rebalances your portfolio for maximum returns.",
    href: "/auto-rebalance",
    cta: "See how it works",
    background: (
      <img
        src="/placeholder.svg?height=200&width=200"
        alt=""
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-2",
  },
  {
    Icon: BarChartIcon,
    name: "Real-time Analytics",
    description:
      "Track your yield performance across all chains in one dashboard.",
    href: "/analytics",
    cta: "View demo",
    background: (
      <img
        src="/placeholder.svg?height=200&width=200"
        alt=""
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: LockClosedIcon,
    name: "Security First",
    description:
      "Your assets are protected by industry-leading security measures.",
    href: "/security",
    cta: "Learn about security",
    background: (
      <img
        src="/placeholder.svg?height=200&width=200"
        alt=""
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-2",
  },
];

export function Grid() {
  return (
    <BentoGrid className="px-4 pb-8 md:px-6 lg:px-8 xl:px-36 lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
