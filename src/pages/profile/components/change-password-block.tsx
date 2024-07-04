import { Box, Typography } from "@mui/material";
import { ProfileBlock } from "./profile-block";
import { getFieldError, passwordRegex } from "@lib/form";
import { z } from "zod";
import { useAuth, useAuthUser } from "@app/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "@api/user";
import { toast } from "react-toastify";
import { ToastContent } from "@app/ui/toast";
import { TextField } from "@app/ui/texfield";
import { Button } from "@app/ui/button";

const FormSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8).regex(passwordRegex, {
      message:
        "Must contain 8 characters, a digit, and an uppercase letter and a special symbol",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export type UpdatePasswordFormValues = z.infer<typeof FormSchema>;

export const ChangePasswordBlock = () => {
  const { refetchRefreshToken } = useAuth();
  const authUser = useAuthUser();

  const { control, handleSubmit, watch, reset } =
    useForm<UpdatePasswordFormValues>({
      defaultValues: {
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
      },
      resolver: zodResolver(FormSchema),
    });

  const [oldPassword, newPassword, passwordConfirm] = watch([
    "oldPassword",
    "newPassword",
    "passwordConfirm",
  ]);

  const $updatePassword = useMutation({
    mutationFn: updateUserPassword,
  });

  return (
    <ProfileBlock>
      <Typography variant="h4" fontWeight={700}>
        Change password
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
          $updatePassword.mutate(
            { userId: authUser?.user.userId ?? "", ...values },
            {
              onSuccess: () => {
                refetchRefreshToken();
                reset();

                toast.success(
                  <ToastContent title="Success">
                    <Typography variant="body2">
                      Password successfully updated
                    </Typography>
                  </ToastContent>
                );
              },
            }
          );
        })}
      >
        <Controller
          control={control}
          name="oldPassword"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Old password"
              type="password"
              {...getFieldError(error)}
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="New password"
              type="password"
              {...getFieldError(error)}
            />
          )}
        />

        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Confirm password"
              type="password"
              {...getFieldError(error)}
            />
          )}
        />

        <Button
          variant="outlined"
          type="submit"
          disabled={
            oldPassword === "" ||
            newPassword === "" ||
            passwordConfirm === "" ||
            $updatePassword.isPending
          }
          isLoading={$updatePassword.isPending}
          fullWidth
        >
          Change
        </Button>
      </Box>
    </ProfileBlock>
  );
};
