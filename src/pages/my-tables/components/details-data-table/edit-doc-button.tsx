/* eslint-disable @typescript-eslint/no-explicit-any */
import { qk } from "@api/query-keys";
import { TableColumn, updateDocument } from "@api/table";
import { IconEdit } from "@app/assets/icons";
import { Dialog } from "@app/ui/dialog";
import { ToastContent } from "@app/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "@lib/hooks";
import { IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schemaBuilder } from "@utils/schema-builder";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { DynamicController } from "../dynamic-controller";

const FORM_ID = "edit-document-form";

type Props = {
  tableId: string;
  documentId: string;
  tableColumns: Array<TableColumn>;
  defaultValues: Record<string, any>;
};

export const EditDocButton = ({
  tableId,
  documentId,
  tableColumns,
  defaultValues,
}: Props) => {
  const queryClient = useQueryClient();
  const isOpen = useBoolean();

  const { Schema: CollectionDocumentSchema } = schemaBuilder(tableColumns);

  type DocumentDataFormValues = z.infer<typeof CollectionDocumentSchema>;

  const { control, handleSubmit } = useForm<DocumentDataFormValues>({
    defaultValues,
    resolver: zodResolver(CollectionDocumentSchema),
  });

  const $updateDoc = useMutation({
    mutationFn: updateDocument,
  });

  return (
    <>
      <IconButton onClick={isOpen.setTrue}>
        <IconEdit color="primary" />
      </IconButton>

      <Dialog
        open={isOpen.isTrue}
        title="Edit document"
        confirmText="Save"
        onConfirm={handleSubmit((values) => {
          const body = Object.keys(values).reduce(
            (acc, currentKey) => ({
              ...acc,
              [currentKey]: values[currentKey].value,
            }),
            {}
          );

          $updateDoc.mutate(
            { tableId, documentId, body },
            {
              onSuccess() {
                toast.success(
                  <ToastContent title="Deleted">
                    <Typography variant="body2">
                      Document updated successfully
                    </Typography>
                  </ToastContent>
                );
                queryClient.invalidateQueries({
                  queryKey: qk.tables.tableData.toKeyWithArgs({ tableId }),
                });
                isOpen.setFalse();
              },
            }
          );
        })}
        onClose={isOpen.setFalse}
        formId={FORM_ID}
      >
        <Stack spacing={3}>
          {tableColumns.map((column) => (
            <DynamicController
              key={column._id}
              control={control}
              controllerName={`${column.name}.value`}
              type={column.type}
              name={column.name}
              label={column.name}
            />
          ))}
        </Stack>
      </Dialog>
    </>
  );
};
