import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rePassword: z.string(),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"], 
})

export type RegisterFormData = z.infer<typeof registerSchema>
