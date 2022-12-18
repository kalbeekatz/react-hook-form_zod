import { UseFormRegister } from "react-hook-form";

type Props = {
  onSubmit: () => void;
  register: UseFormRegister<any>;
  has_hobby: boolean;
  hobbyError: string | undefined;
  isValid: boolean;
};
export default function Form({
  onSubmit,
  register,
  has_hobby,
  hobbyError,
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
        <input {...register("has_hobby")} />
        犬が好き
      </label>
      {has_hobby && (
        <label>
          好きな犬種:
          <br />
          <input {...register("hobby")} />
          <span>{hobbyError}</span>
        </label>
      )}
      <button disabled={!isValid}>送信</button>
    </form>
  );
}
