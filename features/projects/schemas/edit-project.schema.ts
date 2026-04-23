import z from "zod";

export const updateProjectSchema = z.object({
  title: z.string().min(2, "العنوان مطلوب").max(255, "العنوان طويل جداً"),
  category: z.string().min(2, "التصنيف مطلوب").max(100, "التصنيف طويل جداً"),
  description: z
    .string()
    .min(10, "الوصف مطلوب (10 أحرف على الأقل)")
    .max(1000, "الوصف طويل جداً"),
  imageBefore: z.string("صورة ما بعد المشروع مطلوبة").optional(),
  imageAfter: z.string("صورة ما بعد المشروع مطلوبة").optional(),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
