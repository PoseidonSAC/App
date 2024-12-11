import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00897b",
    },
    secondary: {
      main: "#3f51b5",
    },
    info: {
      main: "#2196f3",
    },
  },
});

export interface AppThemeProps {
  children: ReactNode;
}
export const AppTheme = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
