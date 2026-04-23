import z from "zod";
const iraqiPhoneRegex = /^(?:\+964|00964|0)?7[3-9]\d{8}$/;

export const newPatientSchema = z.object({
  name: z
    .string()
    .min(3, "اسم المريض يجب أن يكون 3 أحرف على الأقل")
    .max(100, "الاسم طويل جداً"),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || iraqiPhoneRegex.test(val), {
      message:
        "رقم الهاتف العراقي غير صحيح (يجب أن يبدأ بـ 07 ويحتوي 11 رقماً)",
    }),
  cardId: z
    .string()
    .min(1, "رقم الهوية يجب أن يكون رقم واحد على الأقل")
    .max(200, "رقم الهوية طويل جداً"),
});

export type NewPatientInput = z.infer<typeof newPatientSchema>;
