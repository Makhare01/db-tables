import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#869EFE",
      light: "#cfd8ff",
    },
    secondary: {
      main: "#cbd5e1",
      light: "#eaeef3",
    },
    background: {
      default: "#EFF3F4",
      paper: "#FFFFFF",
    },
    error: {
      main: "#D32F2F",
      light: "#FF6659",
    },
    success: {
      main: "#31CD63",
      light: "#acebc1",
    },
    text: {
      primary: "#282d2b",
      secondary: "#cbcbcb",
    },
  },

  typography: {
    fontFamily: "Fredoka, sans-serif",

    body1: {
      fontSize: "16px",
      fontWeight: "inherit",
      lineHeight: "23px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: "inherit",
      lineHeight: "20px",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontSize: "12px",
      fontWeight: "inherit",
      lineHeight: "19.2px",
    },
    h1: {
      fontSize: "30px",
      fontWeight: "inherit",
      lineHeight: "42px",
    },
    h2: {
      fontSize: "26px",
      fontWeight: "inherit",
      lineHeight: "36px",
    },
    h3: {
      fontSize: "22px",
      fontWeight: "inherit",
      lineHeight: "34px",
    },
    h4: {
      fontSize: "18px",
      fontWeight: "inherit",
      lineHeight: "22px",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          height: "46px",
          background: "primary.main",
          color: "text.primary",
          padding: "15px 20px",
          fontWeight: 600,
          fontSize: "16px",
          borderRadius: "8px",
          textTransform: "none",
          boxShadow: "none",
        },
        contained: {},
        outlined: {
          borderWidth: 1,
          borderColor: "divider",
          ":hover": {
            borderWidth: 1,
            borderColor: "primary.main",
          },
        },
        text: { color: "text.primary" },
        sizeSmall: {
          height: "40px",
          padding: "12px 16px",
          fontSize: "14px",
        },
        sizeLarge: {
          height: "56px",
        },
      },
    },
  },
});
