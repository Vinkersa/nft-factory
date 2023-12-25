import { createTheme, Theme } from "@mui/material";
import getOverridesComponents from "@styles/getOverridesComponents";
import getTypography from "@styles/getTypography";
import {
  backgroundPaper,
  primary,
  textPrimary,
  textSecondary,
} from "@styles/colors";

const createCustomTheme = (): Theme => {
  const baseTheme = createTheme({
    spacing: (x: number) => `${x * 8}px`,
    palette: {
      background: {
        paper: backgroundPaper,
      },
      primary: {
        main: primary,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
      },
    },
    zIndex: {
      drawer: 100,
      appBar: 99,
    },
  });

  return createTheme({
    ...baseTheme,
    components: getOverridesComponents(baseTheme),
    typography: getTypography(),
  });
};

export default createCustomTheme();
