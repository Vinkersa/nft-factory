import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Button } from "@mui/material";
import { useAccount } from "wagmi";
import useIsWrongChain from "@services/hooks/useIsWrongChain";
import textToWithDots from "@utils/textToWithDots";

const classes = {
  btn: {
    fontSize: 20,
  },
};

const ConnectButton = () => {
  const isWrongChain = useIsWrongChain();
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  if (!address) {
    return (
      <Button sx={classes.btn} variant={"contained"} onClick={() => open()}>
        Connect wallet
      </Button>
    );
  }

  if (isWrongChain) {
    return (
      <Button
        sx={classes.btn}
        variant={"contained"}
        onClick={() => open({ view: "Networks" })}
      >
        Change network
      </Button>
    );
  }

  return (
    <Button sx={classes.btn} variant={"contained"} onClick={() => open()}>
      {textToWithDots(address)}
    </Button>
  );
};

export default ConnectButton;
