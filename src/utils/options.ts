import { SelectOption } from "@app/ui/select";

export const recordToOptions = <T extends string = string>(
  record: Record<T, string>
): Array<SelectOption<T>> => {
  return (
    Object.keys(record).map((key) => ({
      label: record[key as T],
      value: key as T,
    })) ?? []
  );
};
