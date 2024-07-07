import { qk } from "@api/query-keys";
import { getTableDetails } from "@api/table";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { dbVisibilityOptions } from "@utils/tables";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { P, match } from "ts-pattern";
import { format } from "date-fns";
import { Button } from "@app/ui/button";

import { DeleteTableButton, DetailsDataTable } from "../components";
import { paths } from "@app/routes";
import { ErrorView } from "@components/error-view";

export const DetailsField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Typography variant="body1" color="text.secondary" fontWeight={700}>
      {label}:
      <Typography component="span" variant="body1" color="text.primary" ml={1}>
        {value}
      </Typography>
    </Typography>
  );
};

export const MyTableDetailsPage = () => {
  const navigate = useNavigate();

  const { tableId } = useParams() as { tableId: string };

  const $tableDetails = useQuery({
    queryKey: qk.tables.tableDetails.toKeyWithArgs({ tableId }),
    queryFn: () => getTableDetails({ tableId }),
  });

  return (
    <Box width={1} height={1} p={3}>
      {match($tableDetails)
        .with({ isError: true, error: P.select() }, (error) => (
          <ErrorView message={error.message} />
        ))
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isSuccess: true, data: P.select() }, (table) => {
          return (
            <Box maxHeight={1} display="flex" flexDirection="column">
              <Box
                width={1}
                p={3}
                bgcolor="white"
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                borderRadius={2}
                mb={3}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  flexWrap="wrap"
                  gap={3}
                >
                  <DetailsField label="Table name" value={table.tableName} />
                  <DetailsField label="Author" value={table.author} />
                  <DetailsField
                    label="Visibility"
                    value={dbVisibilityOptions[table.visibility]}
                  />
                  <DetailsField
                    label="Creation date"
                    value={format(table.createdAt, "dd MMM yyyy")}
                  />
                </Box>

                <Box display="flex" alignItems="center" gap={3}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      navigate(
                        generatePath(paths.addDataToTable, {
                          tableId: table._id,
                        })
                      );
                    }}
                  >
                    Add data
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(
                        generatePath(paths.editTable, {
                          tableId: table._id,
                        })
                      );
                    }}
                  >
                    Edit
                  </Button>
                  <DeleteTableButton
                    tableId={table._id}
                    tableName={table.tableName}
                  />
                </Box>
              </Box>

              <DetailsDataTable table={table} />
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
