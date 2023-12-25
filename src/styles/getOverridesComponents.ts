import { Components, Theme } from "@mui/material";

const getOverridesComponents = (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      "#root": {
        width: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(rgb(29, 31, 47) 0%, rgb(34, 36, 56) 30%, rgb(58, 28, 76) 70%, rgb(90, 29, 117) 100%)",
      },
      a: {
        textDecoration: "none",
        color: "inherit",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.spacing(4),
        fontSize: 20,
        textTransform: "none",
      },
    },
  },
});

export default getOverridesComponents;
