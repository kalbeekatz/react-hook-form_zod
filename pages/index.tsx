import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
});

// merge ✗
// and ○
/**
 * {
    hobby?: string | undefined;
    has_hobby: boolean;
}
 */
// const conditionalSchema = z
//   .object({
//     has_hobby: z.boolean(),
//     hobby: z.string().optional(),
//   })
//   .superRefine(({ has_hobby, hobby }, ctx) => {
//     if (has_hobby && !hobby) {
//       ctx.addIssue({
//         path: ["hobby"],
//         code: z.ZodIssueCode.too_small,
//         minimum: 1,
//         type: "string",
//         inclusive: false,
//         message: "入力してください",
//       });
//     }
//   });

// merge ✗
// and ○
/**
 * {
    has_hobby: boolean;
    hobby: string | undefined;
}
 */
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
    // superRefine との違いは return で変換ができること
    return {
      has_hobby,
      hobby,
    };
  });

// merge ✗
// and ○
/**
{
    has_hobby: true;
    hobby: string;
} | {
    hobby?: string | undefined;
    has_hobby: false;
}
 */
// const conditionalSchema = z
//   .object({
//     has_hobby: z.literal(true),
//     hobby: z.string().min(1, "入力してください"),
//   })
//   .or(
//     z.object({
//       has_hobby: z.literal(false),
//       hobby: z.string().optional(),
//     })
//   );

// merge ✗
// and ○
/**
{
    has_hobby: true;
    hobby: string;
} | {
    hobby?: string | undefined;
    has_hobby: false;
}
 */
// const conditionalSchema = z.union([
//   z.object({
//     has_hobby: z.literal(true),
//     hobby: z.string().min(1, "入力してください"),
//   }),
//   z.object({
//     has_hobby: z.literal(false),
//     hobby: z.string().optional(),
//   }),
// ]);

type A = z.infer<typeof conditionalSchema>;

// merge ✗
// and ○
/**
    {
      has_hobby: true;
      hobby: string;
    } | {
      hobby?: string | undefined;
      has_hobby: false;
    }
 */
// const conditionalSchema = z.discriminatedUnion("has_hobby", [
//   z.object({
//     has_hobby: z.literal(true),
//     hobby: z.string().min(1, "入力してください"),
//   }),
//   z.object({
//     has_hobby: z.literal(false),
//     hobby: z.string().optional(),
//   }),
// ]);

// merge ○
// and ○
// const conditionalSchema = z.object({
//   has_hobby: z.boolean(),
//   hobby: z.string().min(1, "入力してください"),
// });

type Schema = z.infer<typeof conditionalSchema>;
const schemaMerge = baseSchema.merge(conditionalSchema);
const schema = baseSchema.and(conditionalSchema);
const schemaIntersection = z.intersection(baseSchema, conditionalSchema);
type InputSchema = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<InputSchema>({
    defaultValues: { has_hobby: false, hobby: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: true,
  });
  const has_hobby = watch("has_hobby");
  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <label>
        名前:
        <br />
        <input {...register("name")} />
      </label>
      <label>
        <input type="checkbox" {...register("has_hobby")} />
        犬が好き
      </label>
      {has_hobby && (
        <label>
          好きな犬種:
          <br />
          <input {...register("hobby")} />
          <span>{errors.hobby?.message}</span>
        </label>
      )}
      <button disabled={!isValid}>送信</button>
    </form>
  );
}
