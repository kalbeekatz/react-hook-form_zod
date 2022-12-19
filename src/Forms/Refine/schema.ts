import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z
  .object({
    love_dog: z.boolean(),
    type: z.string().optional(),
  })
  .refine(({ love_dog, type }) => !love_dog || (love_dog && !!type), {
    path: ["type"],
    message: "入力してください",
  });

export const schema = baseSchema.and(conditionalSchema);
export type InputSchema = z.infer<typeof schema>;
