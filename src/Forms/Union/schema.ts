import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z.union([
  z.object({
    has_hobby: z.literal(true),
    hobby: z.string().min(1, "入力してください"),
  }),
  z.object({
    has_hobby: z.literal(false),
    hobby: z.string().optional(),
  }),
]);

export const schema = baseSchema.and(conditionalSchema);
export type InputSchema = z.infer<typeof schema>;
