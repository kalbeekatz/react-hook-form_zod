import { UseFormRegister } from "react-hook-form";

type Props = {
  onSubmit: () => void;
  register: UseFormRegister<any>;
  love_dog: boolean;
  typeError: string | undefined;
  isValid: boolean;
};
export default function Form({
  onSubmit,
  register,
  love_dog,
  typeError,
  isValid,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        名前:
        <br />
        <input {...register("name")} />
      </label>
      <label>
        <input type="checkbox" {...register("love_dog")} />
        犬が好き
      </label>
      {love_dog && (
        <label>
          好きな犬種:
          <br />
          <input {...register("type")} />
          <span>{typeError}</span>
        </label>
      )}
      <button disabled={!isValid}>送信</button>
    </form>
  );
}
