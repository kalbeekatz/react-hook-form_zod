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
    defaultValues: { name: "", love_dog: false, type: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: true,
  });

  const love_dog = watch("love_dog");

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Form
      onSubmit={onSubmit}
      register={register}
      love_dog={love_dog}
      typeError={errors.type?.message}
      isValid={isValid}
    />
  );
}
