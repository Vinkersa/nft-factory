import { Box, Button, Card, Chip, IconButton, Typography } from "@mui/material";
import useGetNFTContractData from "@services/hooks/useGetNFTContractData";
import ethString from "@models/ethString";
import { FC, useMemo } from "react";
import DefaultCollectionImg from "@assets/webp/defaultCollectionImg.webp";
import theme from "@styles/theme";
import { grayBorder } from "@styles/colors";
import { formatEther } from "viem";
import { sepolia } from "viem/chains";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copyTextToClipboard from "@utils/copyTextToClipboard";
import getMintStatus from "@utils/getMintStatus";
import MintStatus from "@constants/MintStatus";
import textToWithDots from "@utils/textToWithDots";
import { useNavigate } from "react-router-dom";
import AppRoutes from "@constants/AppRoutes";
import { useBalance } from "wagmi";

const classes = {
  root: {
    minWidth: 700,
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column-reverse",
      height: "auto",
      minWidth: "auto",
      width: "100%",
    },
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    gap: 1,
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
  textFlexContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: 1,
  },
  iconButton: {
    color: theme.palette.text.primary,
    padding: 0,
  },
  chip: {
    textTransform: "uppercase",
  },
  btnContainer: {
    marginTop: "auto",
    width: "100%",
  },
  btn: {
    width: "100%",
    height: "38px",
  },
  imgContainer: {
    flex: "none",
    width: 300,
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

type Props = {
  collectionAddress: ethString;
  isDetails?: boolean;
};

const DashboardCollection: FC<Props> = ({ collectionAddress, isDetails }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetNFTContractData(collectionAddress);
  const { data: contractBalance, isLoading: isLoadingContractBalance } =
    useBalance({ address: collectionAddress });

  const mintStatus: MintStatus | undefined = useMemo(() => {
    if (data) {
      return getMintStatus(data.paused, data.totalMint, data.maxNftSupply);
    }
  }, [data]);

  if (isLoading || !data) {
    return <Card sx={classes.root}>Loading...</Card>;
  }

  return (
    <Card sx={classes.root}>
      <Box sx={classes.contentContainer}>
        <Box sx={classes.titleContainer}>
          <Typography variant={"subtitle1"} fontWeight={700}>
            {data.name}
          </Typography>
          <Typography variant={"subtitle1"} fontWeight={700}>
            {data.symbol}
          </Typography>
        </Box>
        <Box sx={classes.textFlexContainer}>
          <Typography variant={"body1"} sx={{ wordBreak: "break-all" }}>
            Collection address:{" "}
            {isDetails ? collectionAddress : textToWithDots(collectionAddress)}
          </Typography>
          <IconButton
            sx={classes.iconButton}
            onClick={() => copyTextToClipboard(collectionAddress)}
          >
            <ContentCopyIcon />
          </IconButton>
        </Box>
        <Typography variant={"body1"}>
          Minted: {data.totalMint.toString()}/{data.maxNftSupply.toString()}
        </Typography>
        <Typography variant={"body1"}>
          Price: {formatEther(data.price)} {sepolia.name}
        </Typography>
        <Box sx={classes.textFlexContainer}>
          <Typography variant={"body1"}>Mint status:</Typography>
          <Chip
            size={"small"}
            sx={classes.chip}
            label={mintStatus}
            color={
              mintStatus === MintStatus.minting
                ? "success"
                : mintStatus === MintStatus.paused
                  ? "warning"
                  : "info"
            }
          />
        </Box>
        {isDetails && (
          <Typography variant={"body1"}>
            IPFS hash: {data.baseTokenURI}
          </Typography>
        )}
        {isDetails && (
          <Typography variant={"body1"}>
            Contract balance:{" "}
            {isLoadingContractBalance || !contractBalance
              ? "loading..."
              : contractBalance.formatted + " " + contractBalance.symbol}
          </Typography>
        )}
        {!isDetails && (
          <Box sx={classes.btnContainer}>
            <Button
              variant={"contained"}
              onClick={() =>
                navigate(`${AppRoutes.collection}/${collectionAddress}`)
              }
              sx={classes.btn}
            >
              Details
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={classes.imgContainer}>
        <Box sx={classes.img} component={"img"} src={DefaultCollectionImg} />
      </Box>
    </Card>
  );
};

export default DashboardCollection;
