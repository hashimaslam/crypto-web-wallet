import { createTheme } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#ff8a65",
    },
    secondary: {
      main: "#8c747d",
    },
  },
};
export const theme = createTheme(themeOptions);
