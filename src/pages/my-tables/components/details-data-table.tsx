import { qk } from "@api/query-keys";
import { DBTable, getTableData } from "@api/table";
import { SortItem, Table } from "@app/ui/table";
import { usePagination } from "@app/ui/table/use-pagination";
import { TextField } from "@app/ui/texfield";
import { ErrorView } from "@components/error-view";
import { TableSkeleton } from "@components/table-skeleton";
import { useSearch } from "@lib/hooks";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { match, P } from "ts-pattern";
import { DynamicTableCell } from "./dynamic-table-cell";

type Props = {
  table: DBTable;
};

export const DetailsDataTable = ({ table }: Props) => {
  const [sort, setSort] = useState<SortItem>();
  const { value, search, onChange } = useSearch({
    searchParamsKey: "search",
  });

  const pagination = usePagination(`table-${table._id}-details`);

  const args = {
    tableId: table._id,
    page: pagination.page,
    limit: pagination.pageSize,
    sort,
    search,
  };

  const $tableData = useQuery({
    queryKey: qk.tables.tableData.toKeyWithArgs(args),
    queryFn: () => getTableData(args),
  });

  return (
    <Box
      p={3}
      borderRadius={2}
      bgcolor="background.paper"
      display="flex"
      flexDirection="column"
      overflow="auto"
      flex={1}
    >
      <TextField
        fullWidth
        label="Search"
        placeholder="Start typing..."
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        sx={{ mb: 3 }}
      />
      {match($tableData)
        .with({ isLoading: true }, () => (
          <TableSkeleton columnsCount={4} rowsCount={5} />
        ))
        .with({ isError: true, error: P.select() }, (error) => (
          <ErrorView message={error.message} />
        ))
        .with({ isSuccess: true, data: P.select() }, (tableData) => {
          return (
            <Table
              columns={table.tableColumns.map((column) => ({
                key: column.name,
                name: column.name,
              }))}
              rows={tableData.data.map((item) => ({
                key: item._id.toString(),
                cells: table.tableColumns.map((tableColumn) => (
                  <DynamicTableCell
                    type={tableColumn.type}
                    value={item[tableColumn.name] ?? "-"}
                  />
                )),
              }))}
              pagination={{
                totalCount: tableData.total,
                tablePagination: pagination,
              }}
              sort={sort}
              setSort={setSort}
            />
          );
        })
        .run()}
    </Box>
  );
};
