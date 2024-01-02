import { Components, Theme } from "@mui/material";
import { inputBackground } from "@styles/colors";

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
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: theme.spacing(3),
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: theme.spacing(4),
        textTransform: "none",
        ":disabled": {
          color: "rgba(255, 255, 255, 0.26)",
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        backgroundColor: inputBackground,
        borderRadius: 40,
        ":disabled": {
          "-webkit-text-fill-color": "rgba(255, 255, 255, 0.26)",
        },
      },
      notchedOutline: {
        borderRadius: 40,
      },
    },
  },
});

export default getOverridesComponents;
