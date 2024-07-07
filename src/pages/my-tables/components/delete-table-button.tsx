import { deleteTable } from "@api/table";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Dialog } from "@app/ui/dialog";
import { ToastContent } from "@app/ui/toast";
import { useBoolean } from "@lib/hooks";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  tableId: string;
  tableName: string;
};

export const DeleteTableButton = ({ tableId, tableName }: Props) => {
  const navigate = useNavigate();
  const isOpen = useBoolean();

  const $deleteTable = useMutation({
    mutationFn: deleteTable,
  });

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        disabled={$deleteTable.isPending}
        isLoading={$deleteTable.isPending}
        onClick={() => {
          isOpen.setTrue();
        }}
      >
        Delete
      </Button>

      <Dialog
        open={isOpen.isTrue}
        title="Delete table"
        confirmText="Delete"
        confirmButtonColor="error"
        onConfirm={() => {
          $deleteTable.mutate(
            { tableId, collection: tableName },
            {
              onSuccess() {
                toast.success(
                  <ToastContent title="Deleted">
                    <Typography variant="body2">
                      Table deleted successfully
                    </Typography>
                  </ToastContent>
                );
                navigate(paths.myTables);
              },
            }
          );
        }}
        onClose={isOpen.setFalse}
      >
        <Typography>
          Are you sure you want to delete table{" "}
          <Typography component="span" fontWeight={700}>
            {tableName}
          </Typography>
          . You will lose all filled information into this table!
        </Typography>
      </Dialog>
    </>
  );
};
