import z from "zod";

export const appointmentStatusValues = [
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
] as const;

export const newAppointmentSchema = z.object({
  treatmentId: z
    .string("الخطة العلاجية مطلوبة")
    .uuid("معرف العلاج يجب أن يكون UUID صحيح"),
  appointmentDate: z
    .string()
    .min(1, "تاريخ الموعد مطلوب")
    .transform((val) => {
      const date = new Date(val);
      return date.toISOString();
    }),
  status: z
    .enum(appointmentStatusValues, "الرجاء اختيار حالة صحيحة")
    .default("scheduled")
    .optional(),
  clinicalNotes: z.string().max(1000, "الملاحظات طويلة جداً").optional(),
});

export type NewAppointmentInput = z.infer<typeof newAppointmentSchema>;
