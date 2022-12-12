import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// const schema = z
//   .object({
//     has_hobby: z.boolean(),
//     hobby: z.string().optional(),
//   })
//   .superRefine(({ has_hobby, hobby }, ctx) => {
//     if (has_hobby && !hobby) {
//       ctx.addIssue({
//         path: ["hobby"],
//         code: z.ZodIssueCode.custom,
//         message: "入力してください",
//       });
//     }
//   });
// const schema = z
//   .object({
//     has_hobby: z.boolean(),
//     hobby: z.string().optional(),
//   })
//   .transform(({ has_hobby, hobby }, ctx) => {
//     if (has_hobby && !hobby) {
//       ctx.addIssue({
//         path: ["hobby"],
//         code: z.ZodIssueCode.custom,
//         message: "入力してください",
//       });
//     }
//     // superRefine との違いは return で変換ができること
//     return
//   });
// const schema = z
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
const schema = z.union([
  z.object({
    has_hobby: z.literal(true),
    hobby: z.string().min(1, "入力してください"),
  }),
  z.object({
    has_hobby: z.literal(false),
    hobby: z.string().optional(),
  }),
]);
// const schema = z.discriminatedUnion("has_hobby", [
//   z.object({
//     has_hobby: z.literal(true),
//     hobby: z.string().min(1, "入力してください"),
//   }),
//   z.object({
//     has_hobby: z.literal(false),
//     hobby: z.string().optional(),
//   }),
// ]);
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
    mode: "onBlur",
    shouldUnregister: true,
  });
  const has_hobby = watch("has_hobby");
  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <p>
        <label>
          <input type="checkbox" {...register("has_hobby")} />
          チェックすると趣味の入力欄が表示されます
        </label>
      </p>
      <p>
        {has_hobby && (
          <label>
            趣味:
            <input {...register("hobby")} />
          </label>
        )}
      </p>
      {/* <button disabled={!isValid}>送信</button> */}
      <button>送信</button>
      <p>バリデーションエラー: </p>
      <ul>
        <li>has_hobby: {errors.has_hobby?.message}</li>
        <li>hobby: {errors.hobby?.message}</li>
      </ul>
    </form>
  );
}
