import { z } from 'zod';

export const schema = z.object({
  student: z
    .object({
      fullname: z.string().refine(
        (value) => {
          const names = value.trim().split(" ");
          return names.length >= 2;
        },
        { message: "Full name must contain at least two names" }
      ),
      //email: z.string().email({ message: "Invalid email address" }),
      age: z.number().min(1, { message: "Age must be at least 8" }),
      country: z.string().min(1, { message: "Country is required" }),
      state: z.string().min(1, { message: "State is required" }),
      pathway: z.string().min(1, { message: "Pathway is required" }),
      stage: z.string().min(1, { message: "Stage is required" }),
      course: z.string().min(1, { message: "Course is required" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
      confirm_password: z.string().min(8, {
        message: "Confirm password must be at least 8 characters long",
      }),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }),

  schoolStudent: z.object({
    fullname: z.string().refine(
      (value) => {
        const names = value.trim().split(" ");
        return names.length >= 2;
      },
      { message: "Full name must contain at least two names" }
    ),
    //email: z.string().email({ message: "Invalid email address" }),
    age: z.number().min(1, { message: "Age must be at least 8" }),
    class: z.string().min(1, {message: "Class is required"}),
  }),

  payment: z.object({
    plan: z.string().min(1, { message: "Plan is required" }),
  }),
});
