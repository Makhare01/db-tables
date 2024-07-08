import { paths } from "@app/routes";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@app/ui/button";
import { IconBurgerMenu, IconPlus } from "@app/assets/icons";

type Props = {
  onMenuOpen: () => void;
};

export const Header = ({ onMenuOpen }: Props) => {
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
      <Box display="flex" alignItems="center" gap={2}>
        <IconBurgerMenu
          sx={{
            cursor: "pointer",
            display: { xs: "block", lg: "none" },
            color: "primary.main",
          }}
          onClick={onMenuOpen}
        />
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
      </Box>

      <Button
        variant="outlined"
        sx={{ display: "flex", alignItems: "center" }}
        onClick={() => {
          navigate(paths.createTable);
        }}
      >
        <IconPlus sx={{ mr: 1 }} />
        Create
      </Button>
    </Box>
  );
};
