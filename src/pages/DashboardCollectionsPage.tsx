import { useNftFactoryContractsByOwner } from "@services/contracts/NFTFactory";
import { useAccount } from "wagmi";
import { Box } from "@mui/material";
import DashboardCollection from "@components/DashboardCollection/DashboardCollection";
import theme from "@styles/theme";

const classes = {
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(700px, 1fr))",
    gap: 4,
    [theme.breakpoints.down("md")]: {
      gap: 2,
    },
  },
};

const DashboardCollectionsPage = () => {
  const { address: userAddress } = useAccount();
  const { data: collectionsAddresses = [] } = useNftFactoryContractsByOwner({
    args: [userAddress || "0x"],
    enabled: !!userAddress,
  });

  return (
    <Box sx={classes.root}>
      {collectionsAddresses.map((item) => (
        <DashboardCollection key={item} collectionAddress={item} />
      ))}
    </Box>
  );
};

export default DashboardCollectionsPage;
