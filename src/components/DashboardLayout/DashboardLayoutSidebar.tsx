import { Backdrop, Box, Slide, Typography } from "@mui/material";
import theme from "@styles/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppRoutes from "@constants/AppRoutes";
import { textGray, textSecondary } from "@styles/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, ReactNode } from "react";

const classes = {
  root: {
    width: 280,
    height: "100vh",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    top: 0,
    backgroundColor: theme.palette.background.paper,
    paddingY: theme.spacing(3.75),
    paddingX: theme.spacing(4),
    transition: "0.5s",
    zIndex: theme.zIndex.drawer,
    [theme.breakpoints.down("md")]: {
      paddingX: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      paddingY: theme.spacing(2),
    },
  },
  backdrop: {
    left: 280,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },

  navList: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    transition: "0.5s",
    ":hover": {
      color: textSecondary,
      cursor: "pointer",
    },
  },
  icon: {
    height: 32,
    width: 32,
    color: "inherit",
  },
};

const navList: { path: AppRoutes; title: string; icon: JSX.Element }[] = [
  {
    path: AppRoutes.deployCollection,
    title: "Deploy collection",
    icon: <AddCircleIcon sx={classes.icon} />,
  },
  {
    path: AppRoutes.collections,
    title: "Collections",
    icon: <DashboardIcon sx={classes.icon} />,
  },
];

type Props = {
  open: boolean;
  isMobile: boolean;
  closeDrawer: () => void;
  drawerButton: ReactNode;
};

const DashboardLayoutSidebar: FC<Props> = ({
  open,
  isMobile,
  closeDrawer,
  drawerButton,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (path: AppRoutes) => {
    navigate(path);
    closeDrawer();
  };

  return (
    <Box sx={classes.root} left={!isMobile || open ? 0 : -280}>
      <Slide
        direction={"left"}
        timeout={500}
        in={isMobile && open}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop sx={classes.backdrop} open={true} onClick={closeDrawer} />
      </Slide>
      <Box sx={classes.logoContainer}>
        <Typography variant={"h1"}>NFT Factory</Typography>
        {isMobile && open && drawerButton}
      </Box>
      <Box sx={classes.navList}>
        {navList.map((item) => (
          <Box
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            color={pathname === item.path ? textSecondary : textGray}
            sx={classes.navItem}
          >
            {item.icon}
            <Typography variant={"body1"} color={"inherit"} fontWeight={500}>
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardLayoutSidebar;
