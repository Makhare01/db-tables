import { TableSkeleton } from "@components/table-skeleton";
import { Box, Skeleton } from "@mui/material";

export const CreateTableFormSkeleton = () => {
  return (
    <Box width={1}>
      <Box>
        <Skeleton variant="text" width="10%" />
        <Skeleton variant="rounded" sx={{ height: 50, borderRadius: 2 }} />
      </Box>

      <Box my={3}>
        <Skeleton variant="text" width="10%" />
        <Skeleton variant="rounded" sx={{ height: 50, borderRadius: 2 }} />
      </Box>

      <Skeleton variant="text" width="10%" />

      <TableSkeleton columnsCount={5} rowsCount={5} />

      <Skeleton
        variant="rectangular"
        sx={{ height: 50, borderRadius: 2, mt: 3 }}
      />
    </Box>
  );
};
