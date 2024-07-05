import { TTimestamps } from "@api/common.schema";
import { z } from "zod";

export const DBColumnType = z.union([
  z.literal("STRING"),
  z.literal("NUMBER"),
  z.literal("DATE"),
  z.literal("BOOLEAN"),
]);

export type DatabaseColumnTypes = z.infer<typeof DBColumnType>;

export const DBVisibility = z.union([
  z.literal("PRIVATE"),
  z.literal("PUBLIC"),
]);

export type DatabaseVisibility = z.infer<typeof DBVisibility>;

const TTableColumn = z.object({
  _id: z.string(),
  name: z.string(),
  nullable: z.boolean(),
  type: DBColumnType,
});

export type TableColumn = z.infer<typeof TTableColumn>;

export const TDBTable = z.intersection(
  z.object({
    _id: z.string(),
    userId: z.string(),
    tableName: z.string(),
    visibility: DBVisibility,
    tableColumns: z.array(TTableColumn),
  }),
  TTimestamps
);

export const TDBTables = z.array(TDBTable);

export type DBTable = z.infer<typeof TDBTable>;

// FORM
const DBColumn = z.object({
  name: z
    .string()
    .min(1)
    .max(30)
    .regex(/^[\w-]+$/, {
      message:
        "String must only contain alphanumeric characters, underscores (_), or hyphens (-) and cannot contain spaces.",
    }),
  type: DBColumnType,
  nullable: z.boolean(),
});

export const CreateTableFormSchema = z.object({
  tableName: z
    .string()
    .min(1)
    .max(30)
    .regex(/^[\w-]+$/, {
      message:
        "String must only contain alphanumeric characters, underscores (_), or hyphens (-) and cannot contain spaces.",
    }),
  visibility: DBVisibility,
  tableColumns: z
    .array(DBColumn)
    .min(1, { message: "Table must have at least 1 column" }),
});

export type CreateTableFormValues = z.infer<typeof CreateTableFormSchema>;
