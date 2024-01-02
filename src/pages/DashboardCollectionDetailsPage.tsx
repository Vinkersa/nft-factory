import { useParams } from "react-router-dom";
import ethString from "@models/ethString";
import { Box } from "@mui/material";
import DashboardCollectionDetailsEdit from "@components/DashboardCollectionDetails/DashboardCollectionDetailsEdit";
import DashboardCollection from "@components/DashboardCollection/DashboardCollection";
import theme from "@styles/theme";

const classes = {
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 4,
    [theme.breakpoints.down("xl")]: {
      flexDirection: "column",
      justifyContent: "start",
    },
    [theme.breakpoints.down("md")]: {
      gap: 2,
    },
  },
};

const DashboardCollectionDetailsPage = () => {
  const { collectionAddress = "0x" as ethString } = useParams<{
    collectionAddress: ethString;
  }>();

  return (
    <Box sx={classes.root}>
      <DashboardCollection
        collectionAddress={collectionAddress}
        isDetails={true}
      />
      <DashboardCollectionDetailsEdit collectionAddress={collectionAddress} />
    </Box>
  );
};

export default DashboardCollectionDetailsPage;
