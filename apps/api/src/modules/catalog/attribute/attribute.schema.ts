import { z } from "zod";

export const createAttributeSchema = z
  .object({
    name: z.string().min(2).max(100).trim(),

    key: z
      .string()
      .min(2)
      .max(50)
      .trim()
      .toLowerCase()
      .regex(
        /^[a-z0-9_]+$/,
        "Key can only contain lowercase letters, numbers and underscores",
      ),

    type: z.enum(["TEXT", "NUMBER", "SELECT", "BOOLEAN", "DATE"]),

    required: z.boolean().default(false),

    options: z.array(z.string().min(1)).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === "SELECT" &&
      (!data.options || data.options.length === 0)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "SELECT attribute requires options",
      });
    }
  });
