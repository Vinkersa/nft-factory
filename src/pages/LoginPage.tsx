import { Box, Card, Typography } from "@mui/material";
import ConnectButton from "@components/ConnectButton/ConnectButton";
import theme from "@styles/theme";

const classes = {
  root: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  card: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
};

const LoginPage = () => {
  return (
    <Box sx={classes.root}>
      <Card sx={classes.card}>
        <Typography variant={"h1"}>Welcome to NFT Generator</Typography>
        <Typography variant={"subtitle2"}>
          You need to connect a wallet and use a supported chain to continue
          using this app
        </Typography>
        <ConnectButton />
      </Card>
    </Box>
  );
};

export default LoginPage;
