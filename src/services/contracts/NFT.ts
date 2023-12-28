import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
} from "wagmi";
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from "wagmi/actions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "symbol", internalType: "string", type: "string" },
      { name: "initialOwner", internalType: "address", type: "address" },
      { name: "_maxNftSupply", internalType: "uint256", type: "uint256" },
      { name: "_maxMintCount", internalType: "uint256", type: "uint256" },
      { name: "_price", internalType: "uint256", type: "uint256" },
      { name: "_preMintQty", internalType: "uint256", type: "uint256" },
      { name: "_isPaused", internalType: "bool", type: "bool" },
    ],
  },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC721IncorrectOwner",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC721InsufficientApproval",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC721InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC721InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "ERC721InvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC721InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC721InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ERC721NonexistentToken",
  },
  { type: "error", inputs: [], name: "EnforcedPause" },
  { type: "error", inputs: [], name: "ExpectedPause" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "approved",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "MintToken",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Paused",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Transfer",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Unpaused",
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "baseTokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "maxMintCount",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "maxNftSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_to", internalType: "address", type: "address" },
      { name: "_count", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "pause",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "paused",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "price",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "baseURI", internalType: "string", type: "string" }],
    name: "setBaseURI",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalMint",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "unpause",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [],
    name: "withdrawAll",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useNftBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"baseTokenURI"`.
 */
export function useNftBaseTokenUri<
  TFunctionName extends "baseTokenURI",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "baseTokenURI",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"getApproved"`.
 */
export function useNftGetApproved<
  TFunctionName extends "getApproved",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "getApproved",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useNftIsApprovedForAll<
  TFunctionName extends "isApprovedForAll",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "isApprovedForAll",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"maxMintCount"`.
 */
export function useNftMaxMintCount<
  TFunctionName extends "maxMintCount",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "maxMintCount",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"maxNftSupply"`.
 */
export function useNftMaxNftSupply<
  TFunctionName extends "maxNftSupply",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "maxNftSupply",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"name"`.
 */
export function useNftName<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "name",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"owner"`.
 */
export function useNftOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "owner",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useNftOwnerOf<
  TFunctionName extends "ownerOf",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "ownerOf",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"paused"`.
 */
export function useNftPaused<
  TFunctionName extends "paused",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "paused",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"price"`.
 */
export function useNftPrice<
  TFunctionName extends "price",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "price",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useNftSupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "supportsInterface",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"symbol"`.
 */
export function useNftSymbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "symbol",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useNftTokenUri<
  TFunctionName extends "tokenURI",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "tokenURI",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"totalMint"`.
 */
export function useNftTotalMint<
  TFunctionName extends "totalMint",
  TSelectData = ReadContractResult<typeof nftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftABI,
    functionName: "totalMint",
    ...config,
  } as UseContractReadConfig<typeof nftABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"approve"`.
 */
export function useNftApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nftABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof nftABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "approve", TMode>({
    abi: nftABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"mint"`.
 */
export function useNftMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nftABI, "mint">["request"]["abi"],
        "mint",
        TMode
      > & { functionName?: "mint" }
    : UseContractWriteConfig<typeof nftABI, "mint", TMode> & {
        abi?: never;
        functionName?: "mint";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "mint", TMode>({
    abi: nftABI,
    functionName: "mint",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"pause"`.
 */
export function useNftPause<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nftABI, "pause">["request"]["abi"],
        "pause",
        TMode
      > & { functionName?: "pause" }
    : UseContractWriteConfig<typeof nftABI, "pause", TMode> & {
        abi?: never;
        functionName?: "pause";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "pause", TMode>({
    abi: nftABI,
    functionName: "pause",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useNftRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "renounceOwnership"
        >["request"]["abi"],
        "renounceOwnership",
        TMode
      > & { functionName?: "renounceOwnership" }
    : UseContractWriteConfig<typeof nftABI, "renounceOwnership", TMode> & {
        abi?: never;
        functionName?: "renounceOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "renounceOwnership", TMode>({
    abi: nftABI,
    functionName: "renounceOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useNftSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "safeTransferFrom"
        >["request"]["abi"],
        "safeTransferFrom",
        TMode
      > & { functionName?: "safeTransferFrom" }
    : UseContractWriteConfig<typeof nftABI, "safeTransferFrom", TMode> & {
        abi?: never;
        functionName?: "safeTransferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "safeTransferFrom", TMode>({
    abi: nftABI,
    functionName: "safeTransferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useNftSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "setApprovalForAll"
        >["request"]["abi"],
        "setApprovalForAll",
        TMode
      > & { functionName?: "setApprovalForAll" }
    : UseContractWriteConfig<typeof nftABI, "setApprovalForAll", TMode> & {
        abi?: never;
        functionName?: "setApprovalForAll";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "setApprovalForAll", TMode>({
    abi: nftABI,
    functionName: "setApprovalForAll",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"setBaseURI"`.
 */
export function useNftSetBaseUri<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "setBaseURI"
        >["request"]["abi"],
        "setBaseURI",
        TMode
      > & { functionName?: "setBaseURI" }
    : UseContractWriteConfig<typeof nftABI, "setBaseURI", TMode> & {
        abi?: never;
        functionName?: "setBaseURI";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "setBaseURI", TMode>({
    abi: nftABI,
    functionName: "setBaseURI",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useNftTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "transferFrom"
        >["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof nftABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "transferFrom", TMode>({
    abi: nftABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useNftTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "transferOwnership"
        >["request"]["abi"],
        "transferOwnership",
        TMode
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<typeof nftABI, "transferOwnership", TMode> & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "transferOwnership", TMode>({
    abi: nftABI,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"unpause"`.
 */
export function useNftUnpause<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nftABI, "unpause">["request"]["abi"],
        "unpause",
        TMode
      > & { functionName?: "unpause" }
    : UseContractWriteConfig<typeof nftABI, "unpause", TMode> & {
        abi?: never;
        functionName?: "unpause";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "unpause", TMode>({
    abi: nftABI,
    functionName: "unpause",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftABI}__ and `functionName` set to `"withdrawAll"`.
 */
export function useNftWithdrawAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftABI,
          "withdrawAll"
        >["request"]["abi"],
        "withdrawAll",
        TMode
      > & { functionName?: "withdrawAll" }
    : UseContractWriteConfig<typeof nftABI, "withdrawAll", TMode> & {
        abi?: never;
        functionName?: "withdrawAll";
      } = {} as any,
) {
  return useContractWrite<typeof nftABI, "withdrawAll", TMode>({
    abi: nftABI,
    functionName: "withdrawAll",
    ...config,
  } as any);
}
