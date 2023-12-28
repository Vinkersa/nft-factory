import ethString from "@models/ethString";
import ICollectionData from "@models/ICollectionData";
import { nftABI } from "@services/contracts/NFT";
import { useContractReads } from "wagmi";

const functionNames: Array<keyof ICollectionData> = [
  "name",
  "symbol",
  "baseTokenURI",
  "maxMintCount",
  "maxNftSupply",
  "totalMint",
  "price",
  "paused",
];

const useGetNFTContractData = (address: ethString) => {
  return useContractReads({
    contracts: functionNames.map((functionName) => ({
      address,
      functionName,
      abi: nftABI,
    })),
    select: (data) =>
      functionNames.reduce(
        (res, item, index) => ({ ...res, [item]: data[index].result }),
        {},
      ) as ICollectionData,
  });
};

export default useGetNFTContractData;
