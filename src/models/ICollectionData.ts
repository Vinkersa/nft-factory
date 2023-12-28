interface ICollectionData {
  name: string;
  symbol: string;
  baseTokenURI: string;
  maxMintCount: bigint;
  maxNftSupply: bigint;
  totalMint: bigint;
  price: bigint;
  paused: boolean;
}

export default ICollectionData;
