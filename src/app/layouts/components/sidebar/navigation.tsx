import { Box } from "@mui/material";
import { NavigationItem } from "./navigation-item";
import {
  IconCreateTable,
  IconDashboard,
  IconPublicTables,
  IconTable,
} from "@app/assets/icons";
import { paths } from "@app/routes";

export const Navigation = () => {
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
        children={[
          {
            title: "My tables 1",
            to: "/item1",
            Icon: IconTable,
            isSubItem: true,
          },
          {
            title: "My tables 2",
            to: "/item2",
            Icon: IconTable,
            isSubItem: true,
          },
          {
            title: "My tables 3",
            to: "/item3",
            Icon: IconTable,
            isSubItem: true,
          },
        ]}
      />

      <NavigationItem
        title="Public tables"
        to={paths.publicTables}
        Icon={IconPublicTables}
        children={[
          {
            title: "My tables 1",
            to: "/item1",
            Icon: IconTable,
            isSubItem: true,
          },
          {
            title: "My tables 2",
            to: "/item2",
            Icon: IconTable,
            isSubItem: true,
          },
          {
            title: "My tables 3",
            to: "/item3",
            Icon: IconTable,
            isSubItem: true,
          },
        ]}
      />
    </Box>
  );
};
