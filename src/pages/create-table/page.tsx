import { Box, Typography } from "@mui/material";
import { CreateTableForm } from "./components";
import { generatePath, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDBTable } from "@api/table";
import { qk } from "@api/query-keys";
import { paths } from "@app/routes";

export const CreateTablePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const $createTable = useMutation({
    mutationFn: createDBTable,
  });

  return (
    <Box sx={{ width: 1, height: 1, p: 3 }}>
      <Box bgcolor="background.paper" p={3} borderRadius={2} maxWidth="99%">
        <Typography variant="h4" fontWeight={700} mb={3}>
          Create new table
        </Typography>

        <CreateTableForm
          defaultValues={{
            tableName: "",
            visibility: "PRIVATE",
            tableColumns: [],
          }}
          onSubmit={(values) => {
            $createTable.mutate(values, {
              onSuccess: (table) => {
                queryClient.invalidateQueries({
                  queryKey: qk.tables.myTables.toKey(),
                });
                queryClient.invalidateQueries({
                  queryKey: qk.tables.publicTables.toKey(),
                });

                navigate(
                  generatePath(paths.myTableDetails, {
                    tableId: table._id,
                  })
                );
              },
            });
          }}
          isLoading={$createTable.isPending}
        />
      </Box>
    </Box>
  );
};
