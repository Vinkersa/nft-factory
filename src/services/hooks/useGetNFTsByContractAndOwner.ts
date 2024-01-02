import ethString from "@models/ethString";
import { useAccount, useContractReads } from "wagmi";
import { useNftBalanceOf, useNftTotalMint } from "@services/contracts/NFT";
import { nftABI } from "@services/contracts/NFT";

//TODO use the graph, eth scan api etc instead

const useGetNFTsByContractAndOwner = (collectionAddress: ethString) => {
  const { address: userAddress } = useAccount();
  const { data: nftBalance } = useNftBalanceOf({
    address: collectionAddress,
    args: [userAddress!],
    enabled: !!userAddress,
  });
  const { data: totalMint } = useNftTotalMint({ address: collectionAddress });

  return useContractReads({
    contracts: Array.from(new Array(Number(totalMint!)).keys()).map((item) => ({
      address: collectionAddress,
      abi: nftABI,
      functionName: "ownerOf",
      args: [BigInt(item)],
    })),
    select: (data) =>
      data
        .map((item, index) => ({ result: item.result, index }))
        .filter((item) => item.result === userAddress)
        .map((item) => item.index),
    enabled: !!userAddress && !!nftBalance && !!totalMint,
  });
};

export default useGetNFTsByContractAndOwner;
