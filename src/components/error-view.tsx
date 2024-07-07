import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  message: string;
};

export const ErrorView = ({ message }: Props) => {
  const navigate = useNavigate();

  return (
    <Box width={1} bgcolor="background.paper" p={3} borderRadius={2}>
      <Typography variant="h3" fontWeight={700} mb={2}>
        {message}
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          navigate(paths.dashboard);
        }}
        sx={{ mr: 2 }}
      >
        Go to dashboard
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          location.reload();
        }}
      >
        Refresh
      </Button>
    </Box>
  );
};
