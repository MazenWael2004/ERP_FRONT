import { z } from "zod";

export const createJobSchema = z.object({
  jobTitleEn: z.string().min(1, "JOB_TITLE_EN_REQUIRED"), 
  jobTitleAr: z.string().min(1, "JOB_TITLE_AR_REQUIRED"),
  jobCode:    z.string().min(1, "JOB_CODE_REQUIRED"),   
});