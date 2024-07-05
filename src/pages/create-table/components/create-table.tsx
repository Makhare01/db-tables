import { Button } from "@app/ui/button";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { recordToOptions } from "@utils/options";
import { dbColumnTypesOptions } from "@utils/tables";
import { Control, Controller, FieldArrayWithId } from "react-hook-form";
import { CreateTableFormValues } from "./create-table-form";

type Props = {
  fields: FieldArrayWithId<CreateTableFormValues>[];
  control: Control<CreateTableFormValues>;
  onRemove: (index: number) => void;
};

export const CreateTable = ({ fields, control, onRemove }: Props) => {
  return (
    <TableContainer
      sx={{
        border: 1,
        borderBottom: 0,
        borderRight: 0,
        borderColor: "divider",
        width: "fit-content",
        maxWidth: 1,
        overflow: "auto",
        pb: 1,
        "&::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "primary.light",
          borderRadius: 2,
        },
      }}
    >
      <Table sx={{ overflow: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell
              align="left"
              width={100}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                fontWeight: 700,
              }}
            >
              Name
            </TableCell>

            {fields.map((field, index) => (
              <TableCell
                key={field.id}
                align="left"
                width={200}
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Controller
                  control={control}
                  name={`tableColumns.${index}.name`}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      {...getFieldError(error)}
                      placeholder="Column name"
                      sx={{
                        bgcolor: "transparent",
                      }}
                    />
                  )}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              scope="row"
              width={100}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                fontWeight: 700,
              }}
            >
              Type
            </TableCell>

            {fields.map((field, index) => (
              <TableCell
                key={field.id}
                scope="row"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Controller
                  control={control}
                  name={`tableColumns.${index}.type`}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      {...field}
                      {...getFieldError(error)}
                      fullWidth
                      options={recordToOptions(dbColumnTypesOptions)}
                      sx={{ bgcolor: "transparent" }}
                    />
                  )}
                />
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell
              scope="row"
              width={100}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                fontWeight: 700,
              }}
            >
              Nullable
            </TableCell>

            {fields.map((field, index) => (
              <TableCell
                key={field.id}
                scope="row"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                }}
              >
                <Controller
                  control={control}
                  name={`tableColumns.${index}.nullable`}
                  render={({ field, fieldState: { error } }) => (
                    <Box display="flex" justifyContent="center">
                      <Checkbox {...field} {...getFieldError(error)} />
                    </Box>
                  )}
                />
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell
              scope="row"
              width={100}
              sx={{
                borderRight: 1,
                borderColor: "divider",
                fontWeight: 700,
              }}
            >
              Action
            </TableCell>

            {fields.map((field, index) => (
              <TableCell
                key={field.id}
                scope="row"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                }}
              >
                <Button
                  variant="text"
                  color="error"
                  size="small"
                  fullWidth
                  onClick={() => {
                    onRemove(index);
                  }}
                >
                  Remove
                </Button>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
