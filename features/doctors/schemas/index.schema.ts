import z from "zod";

export const doctorSchema = z.object({
  name: z
    .string("الاسم مطلوب")
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .max(100, "الاسم طويل جداً"),

  profession: z
    .string("التخصص مطلوب")
    .min(3, "التخصص يجب أن يكون 3 أحرف على الأقل")
    .max(150, "التخصص طويل جداً"),

  image: z.string("رابط الصورة مطلوب").optional(),
});

export const createDoctorSchema = doctorSchema;
export const updateDoctorSchema = doctorSchema.partial();

export type DoctorInput = z.infer<typeof doctorSchema>;
