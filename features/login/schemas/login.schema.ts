import { z } from "zod";

export const loginSchema = z.object({
  // username: z.string().min(1, "اسم المستخدم مطلوب"),
  id: z.string().min(1, "معرف البطاقة مطلوب"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
