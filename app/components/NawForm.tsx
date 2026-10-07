"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { personalInfoSchema, type PersonalInfo } from "../schemas";
import TextInput from "./TextInput";
import Button from "./Button";

type Props = {
  defaultValues?: PersonalInfo;
  onSubmit: (value: PersonalInfo) => void;
};
/**
 * Naw (Naam, Adres en Woonplaats) step
 */
export default function NawForm({ defaultValues, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<PersonalInfo>({
    defaultValues,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function validate(values: PersonalInfo) {
    const result = v.safeParse(personalInfoSchema, values);
    if (!result.success) {
      setErrorMessage(
        result.issues[0]?.message ?? "Ingevoerde gegevens zijn ongeldig",
      );
      return;
    }
    setErrorMessage("");
    onSubmit(result.output);
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(validate)(event);
      }}
    >
      {errorMessage && (
        <p className="col-span-2 bg-red-900 p-3 text-center text-white">
          {errorMessage}
        </p>
      )}
      <div className="flex flex-col gap-3 md:grid md:grid-cols-[min-content_1fr] md:[&>label]:self-center md:[&>label]:text-right">
        <TextInput
          label="Voornaam"
          required
          {...register("firstname", { required: true })}
        />

        <TextInput
          label="Achternaam"
          required
          {...register("lastname", { required: true })}
        />

        <TextInput
          label="Geboortedatum"
          type="date"
          required
          {...register("birthdate", { required: true })}
        />

        <TextInput
          label="E-mailadres"
          type="email"
          required
          {...register("email", { required: true })}
        />

        <TextInput
          label="Straat"
          required
          {...register("street", { required: true })}
        />
        <div className="col-start-2 grid grid-cols-[9rem_1fr] gap-4 [&_label]:block">
          <div>
            <TextInput
              label="Postcode"
              required
              {...register("postcode", { required: true })}
            />
          </div>
          <div>
            <TextInput
              label="Stad"
              required
              {...register("city", { required: true })}
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
