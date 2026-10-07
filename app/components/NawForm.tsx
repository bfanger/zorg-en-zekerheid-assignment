"use client";

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { personalInfoSchema, type PersonalInfo } from "../schemas";
import TextInput from "./TextInput";
import Button from "./Button";
import Warning from "./Warning";

type Props = {
  defaultValues?: PersonalInfo;
  onSubmit: (value: PersonalInfo) => void;
};
/**
 * Naw (Naam, Adres en Woonplaats) step
 */
export default function NawForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<PersonalInfo>({
    mode: "onSubmit",
    defaultValues,
    resolver: valibotResolver(personalInfoSchema),
  });

  const errorMessage = Object.values(errors).flat()[0]?.message ?? "";

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <Warning message={errorMessage} className="col-span-2 mb-4" />
      <div className="flex flex-col gap-3 md:grid md:grid-cols-[min-content_1fr] md:[&>label]:self-center md:[&>label]:text-right">
        <TextInput
          label="Voornaam"
          required
          {...register("firstname", {
            onChange: () => clearErrors("firstname"),
          })}
        />

        <TextInput
          label="Achternaam"
          required
          {...register("lastname", { onChange: () => clearErrors("lastname") })}
        />

        <TextInput
          label="Geboortedatum"
          type="date"
          required
          {...register("birthdate", {
            onChange: () => clearErrors("birthdate"),
          })}
        />

        <TextInput
          label="E-mailadres"
          type="email"
          required
          {...register("email", { onChange: () => clearErrors("email") })}
        />

        <TextInput
          label="Straat"
          required
          {...register("street", { onChange: () => clearErrors("street") })}
        />
        <div className="col-start-2 grid grid-cols-[9rem_1fr] gap-4 [&_label]:block">
          <div>
            <TextInput
              label="Postcode"
              required
              {...register("postcode", {
                onChange: () => clearErrors("postcode"),
              })}
            />
          </div>
          <div>
            <TextInput
              label="Stad"
              required
              {...register("city", { onChange: () => clearErrors("city") })}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end">
        <Button type="submit">Volgende stap</Button>
      </div>
    </form>
  );
}
