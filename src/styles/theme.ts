import { createTheme, Theme } from "@mui/material";
import getOverridesComponents from "@styles/getOverridesComponents";
import getTypography from "@styles/getTypography";

const createCustomTheme = (): Theme => {
  const baseTheme = createTheme({
    spacing: (x: number) => `${x * 8}px`,
  });

  return createTheme({
    ...baseTheme,
    components: getOverridesComponents(),
    typography: getTypography(),
  });
};

export default createCustomTheme();
