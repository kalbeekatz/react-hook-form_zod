import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z
  .object({
    has_hobby: z.boolean(),
    hobby: z.string().optional(),
  })
  .superRefine(({ has_hobby, hobby }, ctx) => {
    if (has_hobby && !hobby) {
      ctx.addIssue({
        path: ["hobby"],
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
