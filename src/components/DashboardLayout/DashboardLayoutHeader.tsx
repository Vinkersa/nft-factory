import { Box } from "@mui/material";
import ConnectButton from "@components/ConnectButton/ConnectButton";
import { border } from "@styles/colors";
import theme from "@styles/theme";
import { FC, ReactNode } from "react";

const classes = {
  root: {
    width: "100%",
    height: 100,
    position: "sticky",
    top: 0,
    backdropFilter: "blur(4px)",
    paddingX: theme.spacing(4),
    zIndex: theme.zIndex.appBar,
    [theme.breakpoints.down("md")]: {
      paddingX: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      height: 72,
    },
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: border,
  },
};

type Props = {
  open: boolean;
  isMobile: boolean;
  drawerButton: ReactNode;
};

const DashboardLayoutHeader: FC<Props> = ({ open, isMobile, drawerButton }) => {
  return (
    <Box sx={classes.root}>
      <Box sx={classes.container}>
        <Box>{isMobile && !open && drawerButton}</Box>
        <ConnectButton />
      </Box>
    </Box>
  );
};

export default DashboardLayoutHeader;
