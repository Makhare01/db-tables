import { DBTable, TableColumn } from "@api/table";
import {
  Box,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { dbVisibilityOptions } from "@utils/tables";

const ColumnsTable = ({ columns }: { columns: Array<TableColumn> }) => {
  return (
    <TableContainer sx={{ border: 1, borderColor: "divider" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Nullable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((column) => (
            <TableRow
              key={column._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {column.name}
              </TableCell>
              <TableCell align="left">{column.type}</TableCell>
              <TableCell align="left">{String(column.nullable)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type Props = DBTable;

export const TableCard = ({ tableName, visibility, tableColumns }: Props) => {
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
        <Typography variant="h4" fontWeight={700}>
          {tableName}
        </Typography>
      </Box>

      <Divider />

      <Stack p={3} spacing={2}>
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
