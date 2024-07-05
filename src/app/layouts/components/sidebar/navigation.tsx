import { Box } from "@mui/material";
import { NavigationItem } from "./navigation-item";
import {
  IconCreateTable,
  IconDashboard,
  IconPublicTables,
  IconTable,
} from "@app/assets/icons";
import { paths } from "@app/routes";
import { useQuery } from "@tanstack/react-query";
import { qk } from "@api/query-keys";
import { getMyTables, getPublicTables } from "@api/table";

export const Navigation = () => {
  const { data: myTables } = useQuery({
    queryKey: qk.tables.myTables.toKey(),
    queryFn: getMyTables,
  });

  const { data: publicTables } = useQuery({
    queryKey: qk.tables.publicTables.toKey(),
    queryFn: getPublicTables,
  });

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      gap={2}
      overflow="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "primary.light",
          borderRadius: 2,
        },
        pr: 1,
      }}
    >
      <NavigationItem
        title="Dashboard"
        to={paths.dashboard}
        Icon={IconDashboard}
      />

      <NavigationItem
        title="My tables"
        to={paths.myTables}
        Icon={IconCreateTable}
        children={myTables?.map((table) => ({
          title: table.tableName,
          Icon: IconTable,
          to: table._id,
          isSubItem: true,
        }))}
      />

      <NavigationItem
        title="Public tables"
        to={paths.publicTables}
        Icon={IconPublicTables}
        children={publicTables?.map((table) => ({
          title: table.tableName,
          Icon: IconTable,
          to: table._id,
          isSubItem: true,
        }))}
      />
    </Box>
  );
};
