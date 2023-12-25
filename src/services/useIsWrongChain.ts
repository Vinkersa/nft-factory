import { useNetwork } from "wagmi";

const useIsWrongChain = (): boolean => {
  const { chain, chains } = useNetwork();

  if (!chain) {
    return true;
  }

  return !chains.map((item) => item.id).includes(chain.id);
};

export default useIsWrongChain;
