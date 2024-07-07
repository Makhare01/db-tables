import { qk } from "@api/query-keys";
import { editDBTable, getTableDetails } from "@api/table";
import { Box, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { CreateTableFormSkeleton } from "../components";
import { match, P } from "ts-pattern";
import { ErrorView } from "@components/error-view";
import { CreateTableForm } from "@pages/create-table/components";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";

export const EditTablePage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const authUser = useAuthUser();
  const { tableId } = useParams() as { tableId: string };

  const $tableDetails = useQuery({
    queryKey: qk.tables.tableDetails.toKeyWithArgs({ tableId }),
    queryFn: () => getTableDetails({ tableId }),
  });

  const $editTable = useMutation({
    mutationFn: editDBTable,
  });

  return (
    <Box sx={{ width: 1, height: 1, p: 3 }}>
      <Box bgcolor="background.paper" p={3} borderRadius={2} maxWidth="99%">
        <Typography variant="h4" fontWeight={700} mb={3}>
          Edit table
        </Typography>

        {match($tableDetails)
          .with({ isLoading: true }, () => <CreateTableFormSkeleton />)
          .with({ isError: true, error: P.select() }, (error) => (
            <ErrorView message={error.message} />
          ))
          .with({ isSuccess: true, data: P.select() }, (table) => {
            if (table.userId !== authUser?.user.userId) {
              return (
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign="center"
                  mt={3}
                >
                  You are not able to edit this table
                </Typography>
              );
            }

            return (
              <CreateTableForm
                defaultValues={{
                  tableName: table.tableName,
                  visibility: table.visibility,
                  tableColumns: table.tableColumns,
                }}
                onSubmit={(values) => {
                  $editTable.mutate(
                    { tableId: table._id, ...values },
                    {
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
                    }
                  );
                }}
                isLoading={$editTable.isPending}
                submitButtonText="Edit"
              />
            );
          })
          .run()}
      </Box>
    </Box>
  );
};
