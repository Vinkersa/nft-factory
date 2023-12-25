import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import DashboardLayoutHeader from "@components/DashboardLayout/DashboardLayoutHeader";
import DashboardLayoutSidebar from "@components/DashboardLayout/DashboardLayoutSidebar";
import theme from "@styles/theme";
import { Outlet } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { textSecondary } from "@styles/colors";

const classes = {
  root: {
    width: "100%",
    minHeight: "100vh",
    transition: "0.5s",
    paddingLeft: "280px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
    },
  },
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    [theme.breakpoints.down("sm")]: {
      gap: 2,
    },
  },
  childrenContainer: {
    padding: theme.spacing(0, 4, 4),
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 2, 2),
    },
  },
  toggleIcon: {
    color: textSecondary,
  },
};

const DashboardLayout = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const drawerButton: ReactNode | undefined = useMemo(
    () => (
      <IconButton onClick={() => setOpen(!open)}>
        <DoubleArrowIcon sx={classes.toggleIcon} />
      </IconButton>
    ),
    [open],
  );

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={classes.root}>
      <DashboardLayoutSidebar
        open={open}
        isMobile={isMobile}
        closeDrawer={closeDrawer}
        drawerButton={drawerButton}
      />
      <Box sx={classes.container}>
        <DashboardLayoutHeader
          open={open}
          isMobile={isMobile}
          drawerButton={drawerButton}
        />
        <Box sx={classes.childrenContainer}>
          <Suspense>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
