import MintStatus from "@constants/MintStatus";

const getMintStatus = (
  isPaused: boolean,
  totalMint: bigint,
  maxNftSupply: bigint,
): MintStatus => {
  if (totalMint === maxNftSupply) {
    return MintStatus.ended;
  }
  return isPaused ? MintStatus.paused : MintStatus.minting;
};

export default getMintStatus;
