export const WST_ETH_ARBITRUM = "0x5979D7b546E38E414F7E9822514be443A4800529";
export const WST_ETH_BASE = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
export const SourceABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_router", type: "address", internalType: "address" },
      { name: "_link", type: "address", internalType: "address" },
      { name: "_owner", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "callStrategy",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct Source.StrategyParams",
        components: [
          { name: "token", type: "address", internalType: "address" },
          {
            name: "destinationToken",
            type: "address",
            internalType: "address",
          },
          { name: "user", type: "address", internalType: "address" },
          { name: "slippage", type: "uint24", internalType: "uint24" },
          {
            name: "gasFeeAmount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "borrowPercentage",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      { name: "_sourcePool", type: "address", internalType: "address" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_receiver", type: "address", internalType: "address" },
      {
        name: "_destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getLinkAddress",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOwner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRouterAddr",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenBalanceContract",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setOwner",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_token", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CrossChainMessageSent",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "leverage",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "destinationChainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "Source__NotEnoughLinkBalance",
    inputs: [
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "required", type: "uint256", internalType: "uint256" },
    ],
  },
  { type: "error", name: "Source__OnlyOwnerCanCall", inputs: [] },
  { type: "error", name: "Source__TransferFailed", inputs: [] },
] as const;

export const SourcePoolABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_router", type: "address", internalType: "address" },
      { name: "_link", type: "address", internalType: "address" },
      { name: "_owner", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "callStrategy",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct Source.StrategyParams",
        components: [
          { name: "token", type: "address", internalType: "address" },
          {
            name: "destinationToken",
            type: "address",
            internalType: "address",
          },
          { name: "user", type: "address", internalType: "address" },
          { name: "slippage", type: "uint24", internalType: "uint24" },
          {
            name: "gasFeeAmount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "leverage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "borrowPercentage",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      { name: "_sourcePool", type: "address", internalType: "address" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_receiver", type: "address", internalType: "address" },
      {
        name: "_destinationChainSelector",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getLinkAddress",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOwner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRouterAddr",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenBalanceContract",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setOwner",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_token", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CrossChainMessageSent",
    inputs: [
      {
        name: "messageId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "leverage",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "destinationChainSelector",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "Source__NotEnoughLinkBalance",
    inputs: [
      { name: "balance", type: "uint256", internalType: "uint256" },
      { name: "required", type: "uint256", internalType: "uint256" },
    ],
  },
  { type: "error", name: "Source__OnlyOwnerCanCall", inputs: [] },
  { type: "error", name: "Source__TransferFailed", inputs: [] },
];
