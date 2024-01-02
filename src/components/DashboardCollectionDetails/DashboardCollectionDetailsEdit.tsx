import { FC, useMemo, useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import theme from "@styles/theme";
import ethString from "@models/ethString";
import { grayBorder } from "@styles/colors";
import useGetNFTContractData from "@services/hooks/useGetNFTContractData";
import { LoadingButton } from "@mui/lab";
import {
  useNftPause,
  useNftSetBaseUri,
  useNftUnpause,
  useNftWithdrawAll,
} from "@services/contracts/NFT";
import { useBalance, useWaitForTransaction } from "wagmi";
import { useSnackbar } from "notistack";

const classes = {
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    gap: 2,
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: grayBorder,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    [theme.breakpoints.down("xl")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  formControlLabel: {
    width: "fit-content",
    marginTop: "auto",
  },
  textFieldContainer: {
    display: "flex",
    flex: 1,
    [theme.breakpoints.down("xl")]: {
      marginLeft: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  textField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderWidth: 1,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "& .MuiOutlinedInput-input": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  editBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
};

type Props = {
  collectionAddress: ethString;
};

const DashboardCollectionDetailsEdit: FC<Props> = ({ collectionAddress }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: contractBalance, isLoading: isLoadingContractBalance } =
    useBalance({ address: collectionAddress });
  const {
    data,
    isLoading: isLoadingData,
    refetch,
  } = useGetNFTContractData(collectionAddress);
  const [hash, setHash] = useState<string>("");
  const [approved, setApproved] = useState<boolean>(false);
  const {
    data: writePauseData,
    write: writePause,
    isLoading: isLoadingWritePause,
  } = useNftPause({
    address: collectionAddress,
  });
  const {
    data: writeUnpauseData,
    write: writeUnpause,
    isLoading: isLoadingWriteUnpause,
  } = useNftUnpause({
    address: collectionAddress,
  });
  const {
    data: writeSetBaseURIData,
    write: writeSetBaseURI,
    isLoading: isLoadingWriteSetURI,
  } = useNftSetBaseUri({
    address: collectionAddress,
    args: [hash],
  });
  const {
    data: writeWithdrawAllData,
    write: writeWithdrawAll,
    isLoading: isLoadingWithdrawAll,
  } = useNftWithdrawAll({ address: collectionAddress });
  const { isLoading: isLoadingTx } = useWaitForTransaction({
    hash:
      writePauseData?.hash ||
      writeUnpauseData?.hash ||
      writeSetBaseURIData?.hash ||
      writeWithdrawAllData?.hash,
    onSuccess: () => {
      refetch().then();
      enqueueSnackbar("Settings were successfully updated", {
        variant: "success",
      });
    },
  });

  const isLoading: boolean = useMemo(
    () =>
      isLoadingData ||
      isLoadingWritePause ||
      isLoadingWriteUnpause ||
      isLoadingWriteSetURI ||
      isLoadingWithdrawAll ||
      isLoadingContractBalance ||
      isLoadingTx,
    [
      isLoadingData,
      isLoadingWritePause,
      isLoadingWriteUnpause,
      isLoadingWriteSetURI,
      isLoadingWithdrawAll,
      isLoadingContractBalance,
      isLoadingTx,
    ],
  );

  if (isLoadingData || isLoadingContractBalance || !data || !contractBalance) {
    return <Card sx={classes.root}>Loading...</Card>;
  }

  return (
    <Card sx={classes.root}>
      <Box sx={classes.titleContainer}>
        <Typography variant={"subtitle1"} fontWeight={700}>
          Settings
        </Typography>
      </Box>
      <Box sx={classes.btnContainer}>
        {data.paused ? (
          <LoadingButton
            disabled={!approved || data.maxNftSupply === data.totalMint}
            onClick={() => writeUnpause()}
            loading={isLoading}
            variant={"contained"}
            color={"warning"}
          >
            Unpause
          </LoadingButton>
        ) : (
          <LoadingButton
            disabled={!approved || data.maxNftSupply === data.totalMint}
            onClick={() => writePause()}
            loading={isLoading}
            variant={"contained"}
            color={"warning"}
          >
            Pause
          </LoadingButton>
        )}
        <LoadingButton
          disabled={!approved || contractBalance.value === 0n}
          loading={isLoading}
          onClick={() => writeWithdrawAll()}
          variant={"contained"}
          color={"warning"}
        >
          Withdraw all
        </LoadingButton>
        <Box sx={classes.textFieldContainer}>
          <TextField
            placeholder={"IPFS hash"}
            disabled={!approved}
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            size={"small"}
            sx={classes.textField}
          />
          <LoadingButton
            disabled={!approved}
            loading={isLoading}
            onClick={() => writeSetBaseURI()}
            sx={classes.editBtn}
            variant={"contained"}
            type={"submit"}
          >
            Edit
          </LoadingButton>
        </Box>
      </Box>
      <FormControlLabel
        sx={classes.formControlLabel}
        label={"I confirm that I want to make changes to the contract"}
        control={
          <Checkbox value={approved} onClick={() => setApproved(!approved)} />
        }
      />
    </Card>
  );
};

export default DashboardCollectionDetailsEdit;
