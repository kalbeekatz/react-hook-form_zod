import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z
  .object({
    love_dog: z.boolean(),
    type: z.string().optional(),
  })
  .transform(({ love_dog, type }, ctx) => {
    if (love_dog && !type) {
      ctx.addIssue({
        path: ["type"],
        code: z.ZodIssueCode.custom,
        message: "入力してください",
      });
    }
    return {
      love_dog,
      type,
    };
  });

export const schema = baseSchema.and(conditionalSchema);
export type InputSchema = z.infer<typeof schema>;
