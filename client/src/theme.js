import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
  

    button: {
      textTransform: "none",
      fontWeight: 400,
      fontSize: 18
    },
  },
  shadows: Array(25).fill('none'),
});
  