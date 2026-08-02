import { z } from "zod";

export const createUserSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(1, "USER_NAME_REQUIRED")
      .regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "USER_NAME_ONLY_ENGLISH"),

    password: z
      .string()
      .min(8, "PASSWORD_MIN_8_CHARACTERS")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, "PASSWORD_MIN_8_CHARACTERS"),

    confirmPassword: z
      .string()
      .min(1, "CONFIRM_PASSWORD_REQUIRED"),

      employeeId: z
    .number("EMPLOYEE_ID_MUST_BE_NUMBER")
    .int("EMPLOYEE_ID_MUST_BE_INTEGER")
    .positive("EMPLOYEE_ID_MUST_BE_POSITIVE"),

    roles: z
      .array(z.number().int())
      .min(1, "ROLES_REQUIRED"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "PASSWORDS_DO_NOT_MATCH",
    path: ["confirmPassword"],
  });