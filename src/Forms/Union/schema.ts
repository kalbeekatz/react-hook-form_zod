import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z.union([
  z.object({
    love_dog: z.literal(true),
    type: z.string().min(1, "入力してください"),
  }),
  z.object({
    love_dog: z.literal(false),
    type: z.string().optional(),
  }),
]);

export const schema = baseSchema.and(conditionalSchema);
export type InputSchema = z.infer<typeof schema>;
