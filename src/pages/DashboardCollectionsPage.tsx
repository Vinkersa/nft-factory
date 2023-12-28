import { useNftFactoryContractsByOwner } from "@services/contracts/NFTFactory";
import { useAccount } from "wagmi";
import { Box } from "@mui/material";
import DashboardCollection from "@components/DashboardCollection/DashboardCollection";

const classes = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
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
