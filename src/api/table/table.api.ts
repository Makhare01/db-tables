import { request } from "@lib/request";
import {
  CreateTableFormValues,
  TDBTable,
  TDBTables,
  TTableData,
} from "./table.schema";
import { withPagination } from "@api/list";
import { SortItem } from "@app/ui/table";

export const createDBTable = async (body: CreateTableFormValues) => {
  return await request("/api/table/create").post(
    {
      body,
    },
    TDBTable
  );
};

type EditTableInput = CreateTableFormValues & {
  tableId: string;
};

export const editDBTable = async ({ tableId, ...body }: EditTableInput) => {
  return await request("/api/tables/:tableId/edit").patch(
    {
      body,
      params: {
        tableId,
      },
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

export type GetTableDetailsInput = {
  tableId: string;
};

export const getTableDetails = async ({ tableId }: GetTableDetailsInput) => {
  return await request("/api/tables/:tableId").get(
    {
      params: {
        tableId,
      },
    },
    TDBTable
  );
};

export type DeleteTableInput = {
  tableId: string;
  collection: string;
};

export const deleteTable = async ({
  tableId,
  collection,
}: DeleteTableInput) => {
  return await request("/api/tables/:tableId").delete({
    params: {
      tableId,
    },
    body: {
      collection,
    },
  });
};

export type GetTableDataInput = {
  tableId: string;
  page: number;
  limit: number;
  sort?: SortItem;
  search?: string;
};

export const getTableData = async ({
  tableId,
  page,
  limit,
  sort,
  search,
}: GetTableDataInput) => {
  const query = new URLSearchParams();

  query.set("page", page.toString());
  query.set("limit", limit.toString());

  if (sort) {
    query.set("sortColumn", sort.column);
    query.set("sortDir", sort.dir);
  }

  if (search) {
    query.set("search", search);
  }

  return await request("/api/tables/:tableId/data").get(
    {
      params: {
        tableId,
      },
      query,
    },
    withPagination(TTableData)
  );
};

export type AddTableDataInput = {
  tableId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>;
};

export const addTableData = async ({ tableId, data }: AddTableDataInput) => {
  return await request("/api/tables/:tableId/add-data").post({
    params: {
      tableId,
    },
    body: {
      data,
    },
  });
};
