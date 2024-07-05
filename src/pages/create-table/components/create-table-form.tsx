import { IconPlus } from "@app/assets/icons";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import { Box, FormHelperText, Typography } from "@mui/material";
import { recordToOptions } from "@utils/options";
import { dbVisibilityOptions } from "@utils/tables";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CreateTable } from "./create-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateTableFormSchema,
  CreateTableFormValues,
  createDBTable,
} from "@api/table";
import { Button } from "@app/ui/button";
import { qk } from "@api/query-keys";
import { generatePath, useNavigate } from "react-router-dom";
import { paths } from "@app/routes";

export const CreateTableForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTableFormValues>({
    defaultValues: {
      tableName: "",
      visibility: "PRIVATE",
      tableColumns: [],
    },
    resolver: zodResolver(CreateTableFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tableColumns",
  });

  const $createTable = useMutation({
    mutationFn: createDBTable,
  });

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleSubmit((values) => {
        $createTable.mutate(values, {
          onSuccess: (table) => {
            queryClient.invalidateQueries({
              queryKey: qk.tables.myTables.toKey(),
            });
            queryClient.invalidateQueries({
              queryKey: qk.tables.publicTables.toKey(),
            });

            navigate(
              generatePath(paths.myTableDetails, {
                tableId: table._id,
              })
            );
          },
        });
      })}
    >
      <Controller
        control={control}
        name="tableName"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            {...getFieldError(error)}
            label="Table name"
            placeholder="my-table"
          />
        )}
      />

      <Controller
        control={control}
        name="visibility"
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            {...getFieldError(error)}
            fullWidth
            label="Visibility"
            options={recordToOptions(dbVisibilityOptions)}
          />
        )}
      />

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <Typography variant="body1" fontWeight={700}>
          Table
        </Typography>

        {errors.tableColumns?.message && (
          <FormHelperText
            error
            sx={{
              ml: 0.5,
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "18px",
              color: "text.secondary",
            }}
          >
            {errors.tableColumns?.message}
          </FormHelperText>
        )}
      </Box>

      <Box display="flex" justifyContent="space-between" gap={1} pr={0}>
        <CreateTable
          control={control}
          fields={fields}
          onRemove={(index) => remove(index)}
        />

        <Box
          sx={{
            p: 2,
            minHeight: 1,
            border: 1,
            borderColor: "primary.main",
            bgcolor: "background.paper",
            borderRadius: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.3s",
            ":hover": {
              borderWidth: 1.5,
              borderColor: "success.main",
            },
            ":hover .add-icon": {
              color: "success.main",
            },
            position: "sticky",
            right: 0,
          }}
          onClick={() => {
            append({
              name: "",
              type: "STRING",
              nullable: false,
            });
          }}
        >
          <IconPlus
            className="add-icon"
            sx={{
              transition: "0.3s",
              color: "primary.main",
            }}
          />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="outlined"
        fullWidth
        isLoading={$createTable.isPending}
        disabled={$createTable.isPending}
      >
        Create
      </Button>
    </Box>
  );
};
