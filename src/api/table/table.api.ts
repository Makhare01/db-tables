import { request } from "@lib/request";
import { CreateTableFormValues } from "@pages/create-table/components";
import { TDBTable, TDBTables } from "./table.schema";

export const createDBTable = async (input: CreateTableFormValues) => {
  return await request("/api/table/create").post(
    {
      body: input,
    },
    TDBTable
  );
};

export const getMyTables = async () => {
  return await request("/api/tables/my-tables").get({}, TDBTables);
};

export const getPublicTables = async () => {
  return await request("/api/tables").get({}, TDBTables);
};
