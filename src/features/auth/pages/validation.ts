import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"), // username should be string of at least a char.
  password: z.string().min(1, "Password is required"),
});