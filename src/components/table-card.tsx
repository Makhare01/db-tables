import { DBTable, TableColumn } from "@api/table";
import { Table } from "@app/ui/table";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { dbVisibilityOptions, dbColumnTypesOptions } from "@utils/tables";
import { useNavigate } from "react-router-dom";

const ColumnsTable = ({ columns }: { columns: Array<TableColumn> }) => {
  return (
    <Table
      columns={[
        { key: "name", name: "Name" },
        { key: "type", name: "Type", align: "left" },
        { key: "nullable", name: "Nullable", align: "left" },
      ]}
      rows={columns.map((column) => ({
        key: column._id,
        cells: [
          column.name,
          dbColumnTypesOptions[column.type],
          String(column.nullable),
        ],
      }))}
    />
  );
};

type Props = DBTable & {
  to: string;
};

export const TableCard = ({
  author,
  tableName,
  visibility,
  tableColumns,
  to,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 350,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box width={1} p={3} py={2}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, cursor: "pointer" }}
          onClick={() => {
            navigate(to);
          }}
        >
          {tableName}
        </Typography>
      </Box>

      <Divider />

      <Stack p={3} spacing={2}>
        <Typography variant="body2" color="text.secondary" fontWeight={700}>
          Author:
          <Typography component="span" color="text.primary" ml={1}>
            {author}
          </Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" fontWeight={700}>
          Visibility:
          <Typography component="span" color="text.primary" ml={1}>
            {dbVisibilityOptions[visibility]}
          </Typography>
        </Typography>

        <Typography variant="body2" color="text.secondary" fontWeight={700}>
          Columns:
          <Typography component="span" color="text.primary" ml={1}>
            {tableColumns.length}
          </Typography>
        </Typography>

        <ColumnsTable columns={tableColumns} />
      </Stack>
    </Box>
  );
};
