import { qk } from "@api/query-keys";
import { addTableData, getTableDetails } from "@api/table";
import { Button } from "@app/ui/button";
import { Column, Table } from "@app/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { schemaBuilder } from "@utils/schema-builder";
import { useFieldArray, useForm } from "react-hook-form";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { P, match } from "ts-pattern";
import { z } from "zod";
import { DynamicController } from "../components";
import { IconTrashBin } from "@app/assets/icons";
import { toast } from "react-toastify";
import { ToastContent } from "@app/ui/toast";
import { paths } from "@app/routes";

export const AddDataPage = () => {
  const navigate = useNavigate();
  const { tableId } = useParams() as { tableId: string };

  const $tableDetails = useQuery({
    queryKey: qk.tables.tableDetails.toKeyWithArgs({ tableId }),
    queryFn: () => getTableDetails({ tableId }),
  });

  const { Schema: TableDataFormSchema, defaultValues } = schemaBuilder(
    $tableDetails.data?.tableColumns ?? []
  );

  type TableDataFormValues = z.infer<typeof TableDataFormSchema>;

  const { control, handleSubmit, watch, reset } = useForm<TableDataFormValues>({
    defaultValues: {
      rows: [],
    },
    resolver: zodResolver(TableDataFormSchema),
  });

  const rows = watch("rows");

  const { fields, append, remove } = useFieldArray({ control, name: "rows" });

  const $addData = useMutation({
    mutationFn: addTableData,
  });

  return (
    <Box width={1} height={1} p={3}>
      {match($tableDetails)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isSuccess: true, data: P.select() }, (table) => {
          const columns: Array<Column> = table.tableColumns.map((column) => ({
            key: column._id,
            name: column.name,
            align: "left",
            width: 200,
          }));

          return (
            <Box
              component="form"
              onSubmit={handleSubmit((values) => {
                const data = values.rows.map((row) => {
                  const obj = Object.keys(row).reduce((acc, currentKey) => {
                    return { ...acc, [currentKey]: row[currentKey].value };
                  }, {});

                  return obj;
                });

                $addData.mutate(
                  {
                    tableId,
                    data,
                  },
                  {
                    onSuccess: () => {
                      toast.success(
                        <ToastContent title="Added">
                          <Typography variant="body2">
                            Successfully added data added to table:{" "}
                            {table.tableName}
                          </Typography>
                        </ToastContent>
                      );
                      reset();
                      navigate(
                        generatePath(paths.myTableDetails, {
                          tableId: table._id,
                        })
                      );
                    },
                  }
                );
              })}
            >
              <Box
                p={3}
                width={1}
                bgcolor="background.paper"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderRadius={2}
              >
                <Typography variant="body1">
                  Add data to table:{" "}
                  <Typography component="span" fontWeight={700}>
                    {table.tableName}
                  </Typography>
                </Typography>

                <Button
                  type="submit"
                  variant="outlined"
                  color="success"
                  disabled={rows.length === 0 || $addData.isPending}
                  isLoading={$addData.isPending}
                >
                  Save
                </Button>
              </Box>

              <Box sx={{ bgcolor: "white", borderRadius: 2, mt: 3, p: 3 }}>
                <Table
                  columns={[
                    ...columns,
                    {
                      key: "actions",
                      name: "Actions",
                      align: "right",
                      width: 100,
                    },
                  ]}
                  rows={fields.map((field, index) => {
                    return {
                      key: field.id,
                      cells: [
                        ...Object.keys(field)
                          .filter((fieldKey) => fieldKey !== "id")
                          .map((key, keyIndex) => {
                            const type = field[key].type;

                            return (
                              <DynamicController
                                key={key + keyIndex}
                                control={control}
                                index={index}
                                type={type}
                                name={key}
                              />
                            );
                          }),
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          <Button
                            variant="text"
                            color="error"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <IconTrashBin />
                          </Button>
                        </Box>,
                      ],
                    };
                  })}
                  containerSx={{ borderRadius: 2 }}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    append(defaultValues);
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
