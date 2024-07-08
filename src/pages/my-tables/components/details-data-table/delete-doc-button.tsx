import { qk } from "@api/query-keys";
import { deleteDocument } from "@api/table";
import { IconTrashBin } from "@app/assets/icons";
import { Dialog } from "@app/ui/dialog";
import { ToastContent } from "@app/ui/toast";
import { useBoolean } from "@lib/hooks";
import { IconButton, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Props = {
  tableId: string;
  documentId: string;
};

export const DeleteDocButton = ({ tableId, documentId }: Props) => {
  const queryClient = useQueryClient();

  const isOpen = useBoolean();

  const $deleteDoc = useMutation({
    mutationFn: deleteDocument,
  });

  return (
    <>
      <IconButton onClick={isOpen.setTrue}>
        <IconTrashBin color="error" />
      </IconButton>

      <Dialog
        open={isOpen.isTrue}
        title="Delete document"
        confirmText="Delete"
        confirmButtonColor="error"
        onConfirm={() => {
          $deleteDoc.mutate(
            { tableId, documentId },
            {
              onSuccess() {
                toast.success(
                  <ToastContent title="Deleted">
                    <Typography variant="body2">
                      Document deleted successfully
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
        }}
        onClose={isOpen.setFalse}
      >
        <Typography>
          Are you sure you want to delete document with id{" "}
          <Typography component="span" fontWeight={700}>
            {documentId}?
          </Typography>
        </Typography>
      </Dialog>
    </>
  );
};
