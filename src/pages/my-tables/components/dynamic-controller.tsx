/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseColumnTypes } from "@api/table";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import { Checkbox } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { DatePicker } from "@app/ui/date-picker";

type Props = {
  control: Control<any>;
  type: DatabaseColumnTypes;
  name: string;
  controllerName: string;
  label?: string;
};

export const DynamicController = ({
  control,
  type,
  name,
  controllerName,
  label,
}: Props) => {
  return (
    <Controller
      control={control}
      name={controllerName}
      render={({ field, fieldState: { error } }) => {
        if (type === "BOOLEAN") {
          return (
            <Checkbox
              {...field}
              checked={Boolean(field.value)}
              sx={{ width: 30, height: 30 }}
            />
          );
        }

        if (type === "DATE") {
          return (
            <DatePicker {...field} label={label} {...getFieldError(error)} />
          );
        }

        return (
          <TextField
            value={type === "NUMBER" ? Number(field.value) : field.value}
            onChange={(event) => {
              const value =
                type === "NUMBER"
                  ? Number(event.target.value)
                  : event.target.value;
              field.onChange(value);
            }}
            {...getFieldError(error)}
            type={type === "NUMBER" ? "number" : "text"}
            placeholder={name}
            label={label}
          />
        );
      }}
    />
  );
};
