import { Box } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ProfileBlock = ({ children }: Props) => {
  return (
    <Box
      p={3}
      bgcolor="background.paper"
      borderRadius={2}
      width={{ md: 1, lg: "50%" }}
    >
      {children}
    </Box>
  );
};
