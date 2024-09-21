export const WST_ETH_ARBITRUM = "0x5979D7b546E38E414F7E9822514be443A4800529";
export const WST_ETH_BASE = "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";
export const WST_ETH_LINEA = "0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F";
export const Source_Address_Arbitrum =
  "0x3E8c7e98d11C0fCD5d7B534ddbfEb1C14d3b4D81";
export const Source_Pool_Addresss_Arbitrum =
  "0xb12081B5d7E1168847a4548e3f8FF27Dd6886916";
export const Source_Addresss_Arbitrum_LZ =
  "0xaC2422F51bcED9E675690f988dEf412fB790A27D";

export const Source_Pool_Addresss_Arbitrum_LZ =
  "0xaF4630AD752DEe2b85001767271933972891A461";
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
      { name: "_receiver", type: "address", internalType: "address" },
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

export const SourceABILZ = [
  {
    inputs: [
      { internalType: "address", name: "_endpoint", type: "address" },
      { internalType: "address", name: "_owner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "InvalidDelegate", type: "error" },
  { inputs: [], name: "InvalidEndpointCall", type: "error" },
  {
    inputs: [{ internalType: "uint16", name: "optionType", type: "uint16" }],
    name: "InvalidOptionType",
    type: "error",
  },
  { inputs: [], name: "LzTokenUnavailable", type: "error" },
  {
    inputs: [{ internalType: "uint32", name: "eid", type: "uint32" }],
    name: "NoPeer",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "msgValue", type: "uint256" }],
    name: "NotEnoughNative",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint32", name: "eid", type: "uint32" },
      { internalType: "bytes32", name: "sender", type: "bytes32" },
    ],
    name: "OnlyPeer",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
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
    ],
    name: "CrossChainMessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint32", name: "eid", type: "uint32" },
      {
        indexed: false,
        internalType: "bytes32",
        name: "peer",
        type: "bytes32",
      },
    ],
    name: "PeerSet",
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
          { internalType: "uint128", name: "gasFeeAmount", type: "uint128" },
          { internalType: "uint256", name: "leverage", type: "uint256" },
          {
            internalType: "uint256",
            name: "borrowPercentage",
            type: "uint256",
          },
        ],
        internalType: "struct SourceLZ.StrategyParams",
        name: "params",
        type: "tuple",
      },
      { internalType: "address", name: "_sourcePool", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint32", name: "_dstEid", type: "uint32" },
    ],
    name: "callStrategy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "endpoint",
    outputs: [
      {
        internalType: "contract ILayerZeroEndpointV2",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "getTokenBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oAppVersion",
    outputs: [
      { internalType: "uint64", name: "senderVersion", type: "uint64" },
      { internalType: "uint64", name: "receiverVersion", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "eid", type: "uint32" }],
    name: "peers",
    outputs: [{ internalType: "bytes32", name: "peer", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_delegate", type: "address" }],
    name: "setDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint32", name: "_eid", type: "uint32" },
      { internalType: "bytes32", name: "_peer", type: "bytes32" },
    ],
    name: "setPeer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
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
