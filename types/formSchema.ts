import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  company: z.string().optional(),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  investment_interest: z
    .string()
    .min(1, "Please select an investment interest"),
  amount: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormProps = z.infer<typeof contactFormSchema>;
