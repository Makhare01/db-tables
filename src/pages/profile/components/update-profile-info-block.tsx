import { Box, Typography } from "@mui/material";
import { ProfileBlock } from "./profile-block";
import { useAuth, useAuthUser } from "@app/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@api/user";
import { z } from "zod";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import { Button } from "@app/ui/button";

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

type FormValues = z.infer<typeof FormSchema>;

export const UpdateProfileInfoBlock = () => {
  const { refetchRefreshToken } = useAuth();
  const authUser = useAuthUser();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: authUser?.user.firstName ?? "",
      lastName: authUser?.user.lastName ?? "",
      email: authUser?.user.email ?? "",
    },
    resolver: zodResolver(FormSchema),
  });

  const $credentials = useMutation({
    mutationFn: updateUser,
  });

  return (
    <ProfileBlock>
      <Typography variant="h4" fontWeight={700}>
        Update profile info
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          mt: 2,
        }}
        onSubmit={handleSubmit((values) => {
          $credentials.mutate(
            {
              userId: authUser?.user.userId ?? "",
              ...values,
            },
            {
              onSuccess: (user) => {
                refetchRefreshToken();
                reset(user);
              },
            }
          );
        })}
      >
        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="First name"
              {...getFieldError(error)}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Last name"
              {...getFieldError(error)}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Email"
              {...getFieldError(error)}
            />
          )}
        />

        <Button
          variant="outlined"
          type="submit"
          disabled={!isDirty}
          isLoading={$credentials.isPending}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </ProfileBlock>
  );
};
