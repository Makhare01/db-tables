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
import { DynamicTableCell } from "../dynamic-table-cell";
import { DeleteDocButton } from "./delete-doc-button";
import { EditDocButton } from "./edit-doc-button";

type Props = {
  table: DBTable;
  isPublic?: boolean;
};

export const DetailsDataTable = ({ table, isPublic }: Props) => {
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
    search: search ?? "",
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
              columns={[
                ...table.tableColumns.map((column) => ({
                  key: column.name,
                  name: column.name,
                  sortable: true,
                })),
                ...(!isPublic
                  ? [
                      {
                        name: "Actions",
                        key: "actions",
                        width: 100,
                      },
                    ]
                  : []),
              ]}
              rows={tableData.data.map((item) => ({
                key: item._id.toString(),
                cells: [
                  ...table.tableColumns.map((tableColumn) => (
                    <DynamicTableCell
                      type={tableColumn.type}
                      value={item[tableColumn.name] ?? "-"}
                    />
                  )),
                  ...(!isPublic
                    ? [
                        <Box display="flex" alignItems="center" gap={1}>
                          <EditDocButton
                            tableId={table._id}
                            documentId={String(item._id)}
                            tableColumns={table.tableColumns}
                            defaultValues={table.tableColumns.reduce(
                              (acc, nextVal) => {
                                const type = nextVal.type;
                                const value = item[nextVal.name];

                                return {
                                  ...acc,
                                  [nextVal.name]: {
                                    type,
                                    value:
                                      type === "DATE"
                                        ? new Date(value as string)
                                        : value,
                                  },
                                };
                              },
                              {}
                            )}
                          />
                          <DeleteDocButton
                            tableId={table._id}
                            documentId={String(item._id)}
                          />
                        </Box>,
                      ]
                    : []),
                ],
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
