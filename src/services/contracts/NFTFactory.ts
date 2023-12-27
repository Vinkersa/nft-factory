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
// NFTFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftFactoryABI = [
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "name", internalType: "string", type: "string" },
      { name: "symbol", internalType: "string", type: "string" },
      { name: "_maxNftSupply", internalType: "uint256", type: "uint256" },
      { name: "_maxMintCount", internalType: "uint256", type: "uint256" },
      { name: "_price", internalType: "uint256", type: "uint256" },
      { name: "_preMintQty", internalType: "uint256", type: "uint256" },
      { name: "_isPaused", internalType: "bool", type: "bool" },
    ],
    name: "createERC721",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_fee", internalType: "uint256", type: "uint256" }],
  },
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
        name: "erc721Contract",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "name", internalType: "string", type: "string", indexed: false },
      {
        name: "symbol",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "ERC721Created",
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
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_fee", internalType: "uint256", type: "uint256" }],
    name: "setFee",
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
    stateMutability: "payable",
    type: "function",
    inputs: [],
    name: "withdrawAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "contractsByOwner",
    outputs: [{ name: "", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "fee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
] as const;

export const nftFactoryAddress =
  "0xB062bAFdb9e937b6068C720a7438140e9a246b60" as const;

export const nftFactoryConfig = {
  address: nftFactoryAddress,
  abi: nftFactoryABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"contractsByOwner"`.
 */
export function useNftFactoryContractsByOwner<
  TFunctionName extends "contractsByOwner",
  TSelectData = ReadContractResult<typeof nftFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftFactoryABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "contractsByOwner",
    ...config,
  } as UseContractReadConfig<typeof nftFactoryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"fee"`.
 */
export function useNftFactoryFee<
  TFunctionName extends "fee",
  TSelectData = ReadContractResult<typeof nftFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftFactoryABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "fee",
    ...config,
  } as UseContractReadConfig<typeof nftFactoryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"owner"`.
 */
export function useNftFactoryOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof nftFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftFactoryABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "owner",
    ...config,
  } as UseContractReadConfig<typeof nftFactoryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"createERC721"`.
 */
export function useNftFactoryCreateErc721<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftFactoryABI,
          "createERC721"
        >["request"]["abi"],
        "createERC721",
        TMode
      > & { functionName?: "createERC721" }
    : UseContractWriteConfig<typeof nftFactoryABI, "createERC721", TMode> & {
        abi?: never;
        functionName?: "createERC721";
      } = {} as any,
) {
  return useContractWrite<typeof nftFactoryABI, "createERC721", TMode>({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "createERC721",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useNftFactoryRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftFactoryABI,
          "renounceOwnership"
        >["request"]["abi"],
        "renounceOwnership",
        TMode
      > & { functionName?: "renounceOwnership" }
    : UseContractWriteConfig<
        typeof nftFactoryABI,
        "renounceOwnership",
        TMode
      > & {
        abi?: never;
        functionName?: "renounceOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof nftFactoryABI, "renounceOwnership", TMode>({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "renounceOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"setFee"`.
 */
export function useNftFactorySetFee<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftFactoryABI,
          "setFee"
        >["request"]["abi"],
        "setFee",
        TMode
      > & { functionName?: "setFee" }
    : UseContractWriteConfig<typeof nftFactoryABI, "setFee", TMode> & {
        abi?: never;
        functionName?: "setFee";
      } = {} as any,
) {
  return useContractWrite<typeof nftFactoryABI, "setFee", TMode>({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "setFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useNftFactoryTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftFactoryABI,
          "transferOwnership"
        >["request"]["abi"],
        "transferOwnership",
        TMode
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<
        typeof nftFactoryABI,
        "transferOwnership",
        TMode
      > & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof nftFactoryABI, "transferOwnership", TMode>({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftFactoryABI}__ and `functionName` set to `"withdrawAll"`.
 */
export function useNftFactoryWithdrawAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftFactoryABI,
          "withdrawAll"
        >["request"]["abi"],
        "withdrawAll",
        TMode
      > & { functionName?: "withdrawAll" }
    : UseContractWriteConfig<typeof nftFactoryABI, "withdrawAll", TMode> & {
        abi?: never;
        functionName?: "withdrawAll";
      } = {} as any,
) {
  return useContractWrite<typeof nftFactoryABI, "withdrawAll", TMode>({
    abi: nftFactoryABI,
    address: nftFactoryAddress,
    functionName: "withdrawAll",
    ...config,
  } as any);
}
