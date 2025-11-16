import z from "zod";

export const AuthSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

export type AuthType = z.infer<typeof AuthSchema>;
