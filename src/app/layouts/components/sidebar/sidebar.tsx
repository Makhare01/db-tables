import { Box, Divider } from "@mui/material";
import { UserProfile } from "./user-profile";
import { Navigation } from "./navigation";
import { LogoutButton } from "./logout-button";

export const Sidebar = () => {
  return (
    <Box
      sx={{
        height: 1,
        width: 300,
        maxWidth: 300,
        bgcolor: "background.paper",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 4,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <UserProfile />

      <Divider />

      <Navigation />

      <Divider />

      <LogoutButton />
    </Box>
  );
};
