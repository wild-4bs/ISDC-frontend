import z from "zod";
import { newPatientSchema } from "../new-patient-dialog/index.schema";

export const editPatientSchema = newPatientSchema
  .partial()
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "يجب تعديل حقل واحد على الأقل",
  });

export type EditPatientInput = z.infer<typeof editPatientSchema>;
