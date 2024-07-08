import { z } from "zod";

export const TTimestamps = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
});
