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
import { CreateTableFormSchema, CreateTableFormValues } from "@api/table";
import { Button } from "@app/ui/button";

type Props = {
  defaultValues: CreateTableFormValues;
  onSubmit: (values: CreateTableFormValues) => void;
  isLoading?: boolean;
  submitButtonText?: string;
};

export const CreateTableForm = ({
  defaultValues,
  onSubmit,
  isLoading,
  submitButtonText,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTableFormValues>({
    defaultValues,
    resolver: zodResolver(CreateTableFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tableColumns",
  });

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
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
        isLoading={isLoading}
        disabled={isLoading}
      >
        {submitButtonText ?? "Create"}
      </Button>
    </Box>
  );
};
