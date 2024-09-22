"use client";
import Transactions from "@/components/Transactions";
import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAllowance from "@/hooks/useAllowance";
import {
  SourceABI,
  SourceABILZ,
  Source_Address_Arbitrum,
  Source_Addresss_Arbitrum_LZ,
  Source_Pool_Addresss_Arbitrum,
  Source_Pool_Addresss_Arbitrum_LZ,
  WST_ETH_ARBITRUM,
  WST_ETH_BASE,
  WST_ETH_LINEA,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [depositAmount, setDepositAmount] = useState("");
  const [leverage, setLeverage] = useState(30);

  const { address } = useAccount();
  const { checkAllowance, approveAllowance } = useAllowance();

  const { data: hash, writeContract, error } = useWriteContract();
  const [destinationChain, setDestinationChain] = useState("Base");

  const handleSwitchDestinationChain = (chain: string) => {
    setDestinationChain(chain);
  };

  if (error) {
    console.log("error", error);
  }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Depositing ${depositAmount} Wsteth`);
    console.log("Leverage amount", leverage);
    console.log("destination chain", destinationChain);

    // const depositAmountWei = parseEther(depositAmount);

    // const allowance = await checkAllowance(
    //   WST_ETH_ARBITRUM,
    //   Source_Address_Arbitrum
    // );

    // Check if approval is needed
    // console.log("this is allowance", allowance);

    // if (parseInt(allowance!) < depositAmountWei) {
    //   console.log("Approval needed. Requesting approval...");
    //   try {
    //     await approveAllowance(
    //       WST_ETH_ARBITRUM,
    //       Source_Address_Arbitrum,
    //       depositAmount
    //     );
    //   } catch (error) {
    //     console.error("Approval failed:", error);
    //     return;
    //   }
    // }

    if (destinationChain === "Base") {
      console.log("doing a txn on base as destination chain");
      writeContract({
        address: Source_Address_Arbitrum, // Replace with your contract address
        abi: SourceABI,
        functionName: "callStrategy",
        args: [
          {
            token: WST_ETH_ARBITRUM,
            destinationToken: WST_ETH_BASE,
            user: address as `0x${string}`,
            slippage: 100,
            gasFeeAmount: BigInt(2000000), //need to be calculated
            leverage: BigInt(leverage),
            borrowPercentage: BigInt(103),
          },
          Source_Pool_Addresss_Arbitrum,
          parseEther(depositAmount),
          "0xaF4630AD752DEe2b85001767271933972891A461",
          BigInt("15971525489660198786"),
        ],
      });
      return;
    }

    console.log("doing a txn on linea as destination chain");

    writeContract({
      address: Source_Addresss_Arbitrum_LZ, // Replace with your contract address
      abi: SourceABILZ,
      functionName: "callStrategy",
      args: [
        {
          token: WST_ETH_ARBITRUM,
          destinationToken: WST_ETH_LINEA,
          user: address as `0x${string}`,
          slippage: 100,
          gasFeeAmount: BigInt(2000000), //need to be calculated
          leverage: BigInt(leverage),
          borrowPercentage: BigInt(70),
        },
        Source_Pool_Addresss_Arbitrum_LZ,
        parseEther(depositAmount),
        30183,
      ],
      value: BigInt(2000000000000000),
    });
  };

  return (
    <div className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-6xl flex-col items-center gap-5 text-center mx-auto">
        <div className="grid gap-6 md:grid-cols-3 w-full mt-8">
          <Card
            className={cn(
              "bg-transparent text-black dark:text-white border-r border-b border-gray-300 dark:border-gray-700",
              "group relative flex flex-col justify-center overflow-hidden rounded-xl",
              "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] p-6"
            )}
          >
            <CardContent className="justify-center">
              <div className="text-4xl font-bold text-left p-0">$851,373</div>
            </CardContent>
            <CardHeader className="py-0">
              <CardTitle className="text-left p-0 text-xl text-grayscale-400">
                Liquidity Facilated
              </CardTitle>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "bg-transparent text-black dark:text-white border-r border-b border-gray-300 dark:border-gray-700",
              "group relative flex flex-col justify-between overflow-hidden rounded-xl",
              "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] p-6"
            )}
          >
            <CardContent className="justify-center">
              <div className="text-4xl font-bold text-left p-0">
                <div className="text-4xl font-bold">37.25%</div>
              </div>
            </CardContent>
            <CardHeader className="py-0">
              <CardTitle className="text-left p-0 text-xl text-grayscale-400">
                APY
              </CardTitle>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "bg-transparent text-black dark:text-white border-r border-b border-gray-300 dark:border-gray-700",
              "group relative flex flex-col justify-between overflow-hidden rounded-xl",
              "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] p-6"
            )}
          >
            <CardContent className="justify-center">
              <div className="text-4xl font-bold text-left p-0">
                <div className="text-4xl font-bold">0.0652%</div>
              </div>
            </CardContent>
            <CardHeader className="py-0">
              <CardTitle className="text-left p-0 text-xl text-grayscale-400">
                DAILY
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-stretch w-full">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <p className="text-xl font-bold">Historical rate</p>
                  <Tabs defaultValue="APY">
                    <TabsList>
                      <TabsTrigger value="APY" className="text-sm">
                        APY
                      </TabsTrigger>
                      <TabsTrigger value="TVL" className="text-sm">
                        TVL
                      </TabsTrigger>
                      <TabsTrigger value="Price" className="text-sm">
                        Price
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold ">
                Deposit Wsteth
              </CardTitle>
              <CardDescription>
                Amplify your yields by depositing Wsteth
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between items-stretch">
              <Select onValueChange={handleSwitchDestinationChain}>
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Linea"
                    className="flex items-center space-x-2"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src="https://s2.coinmarketcap.com/static/img/coins/200x200/27657.png"
                        alt="Base logo"
                        width="24"
                        height="24"
                        className="mr-2 rounded-full"
                      />
                      <span>Linea</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="Base"
                    className="flex items-center space-x-2"
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src="https://moonpay-marketing-c337344.payloadcms.app/media/base%20logo.webp"
                        alt="Base logo"
                        width="24"
                        height="24"
                        className="mr-2 rounded-full"
                      />

                      <span>Base</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <form onSubmit={handleDeposit} className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="WstEth"
                      className="flex items-center space-x-2"
                    >
                      <div className="flex flex-row">
                        <img
                          src="https://s2.coinmarketcap.com/static/img/coins/200x200/12409.png"
                          alt="WstEth logo"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span>wstETH</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Slider
                  defaultValue={[leverage]}
                  min={10}
                  max={50}
                  step={10}
                  onValueChange={(newValue: number[]) => {
                    setLeverage(newValue[0]);
                  }}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1X</span>
                  <span>2X</span>
                  <span>3X</span>
                  <span>4X</span>
                  <span>5X</span>
                </div>
                <Input
                  type="number"
                  placeholder="Amount to deposit"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full"
                  min={0}
                />
                <Button
                  onClick={handleDeposit}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full rounded-full"
                  )}
                  disabled={parseFloat(depositAmount) <= 0}
                >
                  <span>Deposit</span>
                  <Icons.arrowRight className="ml-2 size-4" />
                </Button>
              </form>
              <div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>DEPOSIT FEE</span>
                    <span>0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>WITHDRAWAL FEE</span>
                    <span>0%</span>
                  </div>
                </div>
                <p className="text-xs mt-4 text-muted-foreground">
                  The displayed APY accounts for performance fee that is
                  deducted from the generated yield only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Transactions />
      </div>
    </div>
  );
}
