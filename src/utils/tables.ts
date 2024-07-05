import { DatabaseColumnTypes, DatabaseVisibility } from "@api/table";

export const dbColumnTypesOptions: Record<DatabaseColumnTypes, string> = {
  STRING: "String",
  NUMBER: "Number",
  BOOLEAN: "Boolean",
  DATE: "Date",
};

export const dbVisibilityOptions: Record<DatabaseVisibility, string> = {
  PUBLIC: "Public",
  PRIVATE: "Private",
};
