import { IconUser } from "@app/assets/icons";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const authUser = useAuthUser();

  const navigate = useNavigate();

  return (
    <Box py={1} display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 45,
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(paths.profile);
        }}
      >
        <IconUser sx={{ fontSize: 28 }} />
      </Box>
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {authUser?.user.firstName + " " + authUser?.user.lastName}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {authUser?.user.email}
        </Typography>
      </Box>
    </Box>
  );
};
