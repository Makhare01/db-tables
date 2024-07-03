import { logout } from "@api/auth";
import { IconLogout } from "@app/assets/icons";
import { useAuth } from "@app/auth";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

export const LogoutButton = () => {
  const { unauthorize } = useAuth();

  const $logout = useMutation({
    mutationFn: logout,
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        width: "fit-content",
      }}
      onClick={() => {
        $logout.mutate(undefined, {
          onSuccess() {
            unauthorize();
          },
        });
      }}
    >
      <IconLogout sx={{ color: "text.primary" }} />
      <Typography variant="body2">Log Out</Typography>
    </Box>
  );
};
