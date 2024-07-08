import { qk } from "@api/query-keys";
import { getMyTables } from "@api/table";
import { paths } from "@app/routes";
import { Loader } from "@app/ui/loader";
import { TableCard } from "@components/table-card";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { generatePath } from "react-router-dom";
import { P, match } from "ts-pattern";

export const MyTablesPage = () => {
  const $myTables = useQuery({
    queryKey: qk.tables.myTables.toKey(),
    queryFn: getMyTables,
  });

  return (
    <Box width={1} height={1} p={3}>
      {match($myTables)
        .with({ isLoading: true }, () => {
          return <Loader centered />;
        })
        .with({ isSuccess: true, data: P.select() }, (tables) => {
          return (
            <Box>
              <Box
                width={1}
                p={3}
                bgcolor="white"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={2}
                mb={3}
              >
                <Typography variant="h4" fontWeight={700}>
                  My tables
                </Typography>

                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight={700}
                >
                  tables:
                  <Typography component="span" color="text.primary" ml={1}>
                    {tables.length}
                  </Typography>
                </Typography>
              </Box>

              <Box display="flex" gap={2} flexWrap="wrap" pb={3}>
                {tables.map((table) => (
                  <TableCard
                    key={table._id}
                    to={generatePath(paths.myTableDetails, {
                      tableId: table._id,
                    })}
                    {...table}
                  />
                ))}
              </Box>
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
