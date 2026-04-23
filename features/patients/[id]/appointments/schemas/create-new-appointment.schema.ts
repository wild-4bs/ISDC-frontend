import z from "zod";
import { appointmentStatusValues } from "./edit-appointment.schema";

export const updateAppointmentSchema = z
  .object({
    appointmentDate: z
      .string()
      .min(1, "تاريخ الموعد لا يمكن أن يكون فارغاً")
      .transform((val) => {
        const date = new Date(val);
        return date.toISOString();
      })
      .optional(),
    status: z
      .enum(appointmentStatusValues, "الرجاء اختيار حالة صحيحة")
      .optional(),
    clinicalNotes: z.string().max(1000, "الملاحظات طويلة جداً").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "يجب تقديم حقل واحد على الأقل للتعديل",
  });

export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
