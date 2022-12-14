import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z
  .object({
    love_dog: z.boolean(),
    type: z.string().optional(),
  })
  .superRefine(({ love_dog, type }, ctx) => {
    if (love_dog && !type) {
      ctx.addIssue({
        path: ["type"],
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        type: "string",
        inclusive: false,
        message: "入力してください",
      });
    }
  });

export const schema = baseSchema.and(conditionalSchema);
export type InputSchema = z.infer<typeof schema>;
