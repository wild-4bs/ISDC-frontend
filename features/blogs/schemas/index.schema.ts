import z from "zod";

export const blogPostSchema = z.object({
  title: z
    .string("العنوان مطلوب")
    .min(5, "العنوان يجب أن يكون 5 أحرف على الأقل")
    .max(255, "العنوان طويل جداً"),
  description: z
    .string("الوصف مطلوب")
    .min(10, "الوصف يجب أن يكون 10 أحرف على الأقل")
    .max(2000, "الوصف طويل جداً"),
  banner: z.string("رابط صورة البانر مطلوب").optional(),
  thumbnail: z.string("رابط الصورة المصغرة مطلوب").optional(),
});

export const createBlogPostSchema = blogPostSchema;
export const updateBlogPostSchema = blogPostSchema.partial();

export type BlogPostInput = z.infer<typeof blogPostSchema>;
