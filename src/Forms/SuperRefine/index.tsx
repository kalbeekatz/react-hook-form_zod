import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSchema, schema } from "./schema";
import Form from "../Form";

export default function SuperRefine() {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<InputSchema>({
    defaultValues: { name: "", has_hobby: false, hobby: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const has_hobby = watch("has_hobby");

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Form
      onSubmit={onSubmit}
      register={register}
      has_hobby={has_hobby}
      hobbyError={errors.hobby?.message}
      isValid={isValid}
    />
  );
}
