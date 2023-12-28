import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";

export default defineConfig([
  {
    out: "src/services/contracts/NFTFactory.ts",
    contracts: [
      {
        name: "NFTFactory",
        abi: [
          {
            inputs: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "_maxNftSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_maxMintCount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_price",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_preMintQty",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "_isPaused",
                type: "bool",
              },
            ],
            name: "createERC721",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_fee",
                type: "uint256",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "OwnableInvalidOwner",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "OwnableUnauthorizedAccount",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "erc721Contract",
                type: "address",
              },
              {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                indexed: false,
                internalType: "string",
                name: "symbol",
                type: "string",
              },
            ],
            name: "ERC721Created",
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
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_fee",
                type: "uint256",
              },
            ],
            name: "setFee",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "withdrawAll",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "contractsByOwner",
            outputs: [
              {
                internalType: "address[]",
                name: "",
                type: "address[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "fee",
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
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        address: "0xB062bAFdb9e937b6068C720a7438140e9a246b60",
      },
    ],
    plugins: [
      react({
        useContractRead: false,
        useContractWrite: false,
        useContractFunctionRead: true,
        useContractFunctionWrite: true,
        usePrepareContractWrite: false,
        usePrepareContractFunctionWrite: false,
        useContractEvent: false,
        useContractItemEvent: false,
      }),
    ],
  },
  {
    out: "src/services/contracts/NFT.ts",
    contracts: [
      {
        name: "NFT",
        abi: [
          {
            inputs: [
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "address",
                name: "initialOwner",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_maxNftSupply",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_maxMintCount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_price",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "_preMintQty",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "_isPaused",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "ERC721IncorrectOwner",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "ERC721InsufficientApproval",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "approver",
                type: "address",
              },
            ],
            name: "ERC721InvalidApprover",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
            ],
            name: "ERC721InvalidOperator",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "ERC721InvalidOwner",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "receiver",
                type: "address",
              },
            ],
            name: "ERC721InvalidReceiver",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
            ],
            name: "ERC721InvalidSender",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "ERC721NonexistentToken",
            type: "error",
          },
          {
            inputs: [],
            name: "EnforcedPause",
            type: "error",
          },
          {
            inputs: [],
            name: "ExpectedPause",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "OwnableInvalidOwner",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "OwnableUnauthorizedAccount",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
              },
              {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
              },
            ],
            name: "ApprovalForAll",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
            ],
            name: "MintToken",
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
              {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "Paused",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "Unpaused",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
            ],
            name: "balanceOf",
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
          {
            inputs: [],
            name: "baseTokenURI",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "getApproved",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
            ],
            name: "isApprovedForAll",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "maxMintCount",
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
          {
            inputs: [],
            name: "maxNftSupply",
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
          {
            inputs: [
              {
                internalType: "address",
                name: "_to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_count",
                type: "uint256",
              },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "ownerOf",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "pause",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "paused",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "price",
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
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
              {
                internalType: "bytes",
                name: "data",
                type: "bytes",
              },
            ],
            name: "safeTransferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "operator",
                type: "address",
              },
              {
                internalType: "bool",
                name: "approved",
                type: "bool",
              },
            ],
            name: "setApprovalForAll",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "string",
                name: "baseURI",
                type: "string",
              },
            ],
            name: "setBaseURI",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
              },
            ],
            name: "supportsInterface",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "tokenURI",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalMint",
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
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "unpause",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "withdrawAll",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
        ],
      },
    ],
    plugins: [
      react({
        useContractRead: false,
        useContractWrite: false,
        useContractFunctionRead: true,
        useContractFunctionWrite: true,
        usePrepareContractWrite: false,
        usePrepareContractFunctionWrite: false,
        useContractEvent: false,
        useContractItemEvent: false,
      }),
    ],
  },
]);
