import { qk } from "@api/query-keys";
import { tablesStatistics } from "@api/table";
import { ErrorView } from "@components/error-view";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { match, P } from "ts-pattern";
import { StatisticsChart, StatisticsSkeleton } from "./components";

const StatisticBlock = ({ title, count }: { title: string; count: number }) => {
  return (
    <Box p={2} bgcolor="background.paper" borderRadius={2}>
      <Typography variant="h3" mb={1}>
        {title}
      </Typography>
      <Typography variant="h2" fontWeight={700} mb={1}>
        {count}
      </Typography>
    </Box>
  );
};

export const DashboardPage = () => {
  const $statistics = useQuery({
    queryKey: qk.dashboard.statistics.toKey(),
    queryFn: tablesStatistics,
  });

  return (
    <Box width={1} height={1} p={3}>
      <Box p={3} bgcolor="background.paper" borderRadius={2} mb={3}>
        <Typography variant="h3" fontWeight={700}>
          Dashboard
        </Typography>
      </Box>

      {match($statistics)
        .with({ isLoading: true }, () => <StatisticsSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <ErrorView message={error.message} />
        ))
        .with({ isSuccess: true, data: P.select() }, (data) => {
          return (
            <>
              <Box display="flex" alignItems="flex-start" gap={2} mb={3}>
                <StatisticBlock
                  title="Total tables Created"
                  count={data.tablesCount}
                />
                <StatisticBlock
                  title="Total documents inserted"
                  count={data.myDocumentsCount}
                />
              </Box>

              <Box
                p={3}
                bgcolor="background.paper"
                borderRadius={2}
                height={data.tablesCount > 0 ? 400 : "auto"}
              >
                {data.tablesCount > 0 ? (
                  <StatisticsChart
                    data={Object.keys(data.documentsCount).map((key) => ({
                      name: key,
                      count: data.documentsCount[key],
                    }))}
                  />
                ) : (
                  <Typography
                    textAlign="center"
                    variant="body1"
                    fontWeight={700}
                  >
                    There is no data to show in chart
                  </Typography>
                )}
              </Box>
            </>
          );
        })
        .run()}
    </Box>
  );
};
