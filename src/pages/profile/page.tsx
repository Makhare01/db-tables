import { useAuthUser } from "@app/auth";
import { Box, Typography } from "@mui/material";
import { ChangePasswordBlock, UpdateProfileInfoBlock } from "./components";

export const ProfilePage = () => {
  const authUser = useAuthUser();

  return (
    <Box width={1} height={1} p={3}>
      <Box
        p={3}
        width={1}
        bgcolor="background.paper"
        borderRadius={2}
        display="flex"
        alignContent="center"
        gap={3}
        flexWrap="wrap"
      >
        <Typography variant="body1" color="text.secondary">
          First name:{" "}
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            fontWeight={700}
          >
            {authUser?.user.firstName}
          </Typography>
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Last name:{" "}
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            fontWeight={700}
          >
            {authUser?.user.lastName}
          </Typography>
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Email:{" "}
          <Typography
            component="span"
            variant="body1"
            color="text.primary"
            fontWeight={700}
          >
            {authUser?.user.email}
          </Typography>
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ md: "column", lg: "row" }}
        gap={3}
        mt={3}
        width={1}
      >
        <UpdateProfileInfoBlock />
        <ChangePasswordBlock />
      </Box>
    </Box>
  );
};
