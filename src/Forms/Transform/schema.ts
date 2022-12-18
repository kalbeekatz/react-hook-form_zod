import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

const conditionalSchema = z
  .object({
    has_hobby: z.boolean(),
    hobby: z.string().optional(),
  })
  .transform(({ has_hobby, hobby }, ctx) => {
    if (has_hobby && !hobby) {
      ctx.addIssue({
        path: ["hobby"],
        code: z.ZodIssueCode.custom,
        message: "入力してください",
      });
    }
    return {
      has_hobby,
      hobby,
    };
  });

export const schema = baseSchema.and(conditionalSchema);
export type InputSchema = z.infer<typeof schema>;
