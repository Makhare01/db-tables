import { paths } from "@app/routes";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/ui/button";
import { IconPlus } from "@app/assets/icons";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(paths.dashboard);
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          DB Tables
        </Typography>
      </Box>

      <Button variant="outlined" sx={{ display: "flex", alignItems: "center" }}>
        <IconPlus sx={{ mr: 1 }} />
        Create
      </Button>
    </Box>
  );
};
