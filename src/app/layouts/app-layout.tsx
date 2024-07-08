import { GlobalLoadingIndicator } from "@app/ui/global-loading-indicator";
import { Box, Drawer } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./components";
import { Sidebar } from "./components/sidebar";
import { useBoolean } from "@lib/hooks";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const isOpen = useBoolean(false);

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
        <Drawer
          open={isOpen.isTrue}
          onClose={isOpen.setFalse}
          sx={{
            display: { xs: "block", lg: "none" },
          }}
        >
          <Sidebar />
        </Drawer>

        {/** When screen is bigger then lg */}
        <Box height={1} display={{ xs: "none", lg: "block" }}>
          <Sidebar />
        </Box>

        <Box
          sx={{
            width: 1,
            height: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            maxWidth: { xs: 1, lg: "calc(100% - 300px)" },
            maxHeight: 1,
          }}
        >
          <Header onMenuOpen={isOpen.toggle} />
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
