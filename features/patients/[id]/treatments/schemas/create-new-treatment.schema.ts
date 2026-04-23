import z from "zod";

export const treatmentStatusValues = [
  "active",
  "completed",
  "on_hold",
  "cancelled",
] as const;

export const newTreatmentSchema = z.object({
  serviceType: z
    .string()
    .min(1, "نوع الخدمة مطلوب")
    .max(200, "نوع الخدمة طويل جداً"),
  expectedSessions: z
    .number("عدد الجلسات المتوقعة مطلوبة.")
    .int("عدد الجلسات يجب أن يكون رقماً صحيحاً")
    .min(1, "يجب أن تكون هناك جلسة واحدة على الأقل")
    .max(100, "عدد الجلسات كبير جداً"),
  status: z
    .enum(treatmentStatusValues, "الرجاء اختيار حالة صحيحة")
    .default("active")
    .optional(),
});

export type NewTreatmentInput = z.infer<typeof newTreatmentSchema>;
