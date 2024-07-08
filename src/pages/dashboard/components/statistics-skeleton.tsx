import { Box, Skeleton } from "@mui/material";

export const StatisticsSkeleton = () => {
  return (
    <Box width={1}>
      <Box display="flex" alignItems="flex-start" gap={2} mb={3}>
        <Skeleton variant="rounded" sx={{ width: 200, height: 100 }} />
        <Skeleton variant="rounded" sx={{ width: 200, height: 100 }} />
      </Box>

      <Skeleton variant="rounded" width="100%" height={300} />
    </Box>
  );
};
