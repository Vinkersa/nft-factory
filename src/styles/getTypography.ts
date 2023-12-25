import { TypographyOptions } from "@mui/material/styles/createTypography";

const getTypography = (): TypographyOptions => ({
  h1: {
    fontSize: 32,
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: 26,
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: 20,
    fontWeight: 400,
  },
  body1: {
    fontSize: 18,
    fontWeight: 400,
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
  },
});

export default getTypography;
