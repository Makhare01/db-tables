import { GlobalLoadingIndicator } from "@app/ui/global-loading-indicator";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./components";
import { Sidebar } from "./components/sidebar";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        width: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <GlobalLoadingIndicator />
      <Box
        sx={{
          height: 1,
          width: 1,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Sidebar />
        <Box
          sx={{
            width: 1,
            height: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            maxWidth: "calc(100% - 300px)",
            maxHeight: 1,
          }}
        >
          <Header />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
              maxHeight: 1,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
