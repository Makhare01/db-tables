import { qk } from "@api/query-keys";
import { getTableDetails } from "@api/table";
import { ErrorView } from "@components/error-view";
import { Box, CircularProgress } from "@mui/material";
import { DetailsDataTable } from "@pages/my-tables/components";
import { DetailsField } from "@pages/my-tables/details/page";
import { useQuery } from "@tanstack/react-query";
import { dbVisibilityOptions } from "@utils/tables";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { match, P } from "ts-pattern";

export const PublicTablePage = () => {
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
            <Box>
              <Box
                width={1}
                p={3}
                bgcolor="background.paper"
                display="flex"
                alignItems="flex-start"
                borderRadius={2}
                mb={3}
                gap={2}
                flexWrap="wrap"
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

              <DetailsDataTable table={table} />
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
