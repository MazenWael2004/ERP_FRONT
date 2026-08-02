import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeNameEn: z
    .string()
    .min(1, "EMPLOYEE_NAME_EN_REQUIRED")
    .regex(/^[A-Za-z\s]+$/, "EMPLOYEE_NAME_EN_ONLY_ENGLISH"),

  employeeNameAr: z
    .string()
    .min(1, "EMPLOYEE_NAME_AR_REQUIRED")
    .regex(/^[\u0600-\u06FF\s]+$/, "EMPLOYEE_NAME_AR_ONLY_ARABIC"),

  employeeNum: z
    .string()
    .min(1, "EMPLOYEE_NUMBER_REQUIRED")
    .regex(/^\d+$/, "EMPLOYEE_NUMBER_MUST_BE_INTEGER"),

  email: z
    .string()
    .email("INVALID_EMAIL"),

  street: z
    .string()
    .min(1, "STREET_REQUIRED"),

  city: z
    .string()
    .min(1, "CITY_REQUIRED"),

  governorate: z
    .string()
    .min(1, "GOVERNORATE_REQUIRED"),
  telephoneNum: z
  .string()
  .regex(/^01[0125]\d{8}$/, "INVALID_PHONE_NUMBER"),

  birthDate: z
    .string()
    .min(1, "BIRTH_DATE_REQUIRED"),

  jobId: z
    .number()
    .int()
    .positive(),

  zones: z.array(z.number().int()).optional(),
});