export const WST_ETH_ARBITRUM = "0x5979D7b546E38E414F7E9822514be443A4800529";
export const WST_ETH_BASE = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
export const Source_Address_Arbitrum =
  "0x3E8c7e98d11C0fCD5d7B534ddbfEb1C14d3b4D81";
export const Source_Pool_Addresss_Arbitrum =
  "0xb12081B5d7E1168847a4548e3f8FF27Dd6886916";
export const SourceABI = [
  {
    inputs: [
      { internalType: "address", name: "_router", type: "address" },
      { internalType: "address", name: "_link", type: "address" },
      { internalType: "address", name: "_owner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "required", type: "uint256" },
    ],
    name: "Source__NotEnoughLinkBalance",
    type: "error",
  },
  { inputs: [], name: "Source__OnlyOwnerCanCall", type: "error" },
  { inputs: [], name: "Source__TransferFailed", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "leverage",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "CrossChainMessageSent",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token", type: "address" },
          {
            internalType: "address",
            name: "destinationToken",
            type: "address",
          },
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint24", name: "slippage", type: "uint24" },
          { internalType: "uint256", name: "gasFeeAmount", type: "uint256" },
          { internalType: "uint256", name: "leverage", type: "uint256" },
          {
            internalType: "uint256",
            name: "borrowPercentage",
            type: "uint256",
          },
        ],
        internalType: "struct Source.StrategyParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "address", name: "_sourcePool", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
      {
        internalType: "uint64",
        name: "_destinationChainSelector",
        type: "uint64",
      },
    ],
    name: "callStrategy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLinkAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouterAddr",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "getTokenBalanceContract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const Erc20ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
