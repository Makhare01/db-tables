/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseColumnTypes, DBColumnValue } from "@api/table";
import { format } from "date-fns";

type Props = {
  type: DatabaseColumnTypes;
  value: DBColumnValue;
};

export const DynamicTableCell = ({ type, value }: Props) => {
  let tableCell = null;

  switch (type) {
    case "DATE":
      console.log({ value });
      tableCell = value !== "-" ? format(value as Date, "dd MMM yyyy") : value;
      break;
    case "BOOLEAN":
      tableCell = value === true ? "Yes" : "No";
      break;
    default:
      tableCell = value;
  }

  return <>{tableCell}</>;
};
