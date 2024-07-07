/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseColumnTypes, DBColumnType, TableColumn } from "@api/table";
import { z } from "zod";

export type ControllerFieldValue = string | boolean | number | Date;

const fieldType: Record<
  DatabaseColumnTypes,
  z.ZodType<any, z.ZodTypeDef, any>
> = {
  STRING: z.string(),
  NUMBER: z.number(),
  BOOLEAN: z.boolean(),
  DATE: z.date(),
};

export const schemaBuilder = (columns: Array<TableColumn>) => {
  const schema: Record<
    string,
    z.ZodObject<{
      type: z.ZodTypeAny;
      value: z.ZodType<any, z.ZodTypeDef, any>;
    }>
  > = {};

  for (const column of columns) {
    const value = fieldType[column.type];
    const schemaValue = column.nullable ? value.optional() : value;

    schema[column.name] = z.object({
      type: DBColumnType,
      value: schemaValue,
    });
  }

  const defaultValues: Record<
    string,
    { type: DatabaseColumnTypes; value: ControllerFieldValue }
  > = columns.reduce((accumulator, currentColumn) => {
    const newObj = {
      [currentColumn.name]: { type: currentColumn.type, value: undefined },
    };

    return { ...accumulator, ...newObj };
  }, {});

  return {
    Schema: z.object({ rows: z.array(z.object(schema)) }),
    defaultValues,
  };
};
