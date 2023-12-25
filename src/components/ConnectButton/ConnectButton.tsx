import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@mui/material";
import { useAccount } from "wagmi";
import useIsWrongChain from "@services/useIsWrongChain";
import textToWithDots from "@utils/textToWithDots";

const ConnectButton = () => {
  const isWrongChain = useIsWrongChain();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  if (!address) {
    return (
      <Button variant={"contained"} onClick={() => open()}>
        Connect
      </Button>
    );
  }

  if (isWrongChain) {
    return (
      <Button variant={"contained"} onClick={() => open({ view: "Networks" })}>
        Change network
      </Button>
    );
  }

  return (
    <Button variant={"contained"} onClick={() => open()}>
      {textToWithDots(address)}
    </Button>
  );
};

export default ConnectButton;
