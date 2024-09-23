import { Erc20ABI } from "@/lib/constants";
import getViemPublicClient from "@/utils/getViemPublicClient";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useChainId, useWriteContract } from "wagmi";

export default function useAllowance() {
  const { address } = useAccount();
  const chainID = useChainId();

  const { writeContractAsync } = useWriteContract();

  async function checkAllowance(
    contract: `0x${string}`,
    spender: `0x${string}`
  ) {
    if (!address) return;
    const client = getViemPublicClient(chainID);
    const data = await client.readContract({
      abi: Erc20ABI,
      functionName: "allowance",
      args: [address, spender],
      address: contract,
    });
    return formatUnits(data, 18);
  }

  async function approveAllowance(
    contract: `0x${string}`,
    spender: `0x${string}`,
    amount: string
  ) {
    try {
      if (!address) return;
      const hash = await writeContractAsync({
        abi: Erc20ABI,
        address: contract,
        functionName: "approve",
        args: [spender, parseUnits(amount, 18)],
      });

      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { checkAllowance, approveAllowance };
}