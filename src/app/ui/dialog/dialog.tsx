import { IconClose } from "@app/assets/icons";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
} from "@mui/material";
import { ReactNode } from "react";
import { Button } from "../button";

type Props = DialogProps & {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  confirmText?: string;
  denyText?: string;
  confirmButtonColor?:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning";
};

export const Dialog = ({
  title,
  onClose,
  onConfirm,
  children,
  denyText,
  confirmText,
  confirmButtonColor,
  ...dialogProps
}: Props) => {
  return (
    <MuiDialog
      {...dialogProps}
      fullWidth={dialogProps.fullScreen ?? true}
      maxWidth={dialogProps.maxWidth ?? "sm"}
      onClose={onClose}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pr={1}
      >
        <DialogTitle fontWeight={700} fontSize={18}>
          {title}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <IconClose sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>
      <DialogContent
        sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider", py: 0 }}
      >
        <Box py={3}>{children}</Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          {denyText ?? "Cancel"}
        </Button>
        <Button
          variant="outlined"
          color={confirmButtonColor ?? "success"}
          onClick={onConfirm}
          autoFocus
        >
          {confirmText ?? "Confirm"}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
