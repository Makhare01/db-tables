import { Box, Typography } from "@mui/material";
import { CreateTableForm } from "./components";

export const CreateTablePage = () => {
  return (
    <Box sx={{ width: 1, height: 1, p: 3 }}>
      <Box bgcolor="background.paper" p={3} borderRadius={2} maxWidth="99%">
        <Typography variant="h4" fontWeight={700} mb={3}>
          Create new table
        </Typography>

        <CreateTableForm />
      </Box>
    </Box>
  );
};
