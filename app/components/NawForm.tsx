"use client";

import { useForm } from "react-hook-form";
import type { PersonalInfo } from "../schemas";
import TextInput from "./TextInput";
import Button from "./Button";

type Props = {
  defaultsValues?: PersonalInfo;
  onSubmit: (value: PersonalInfo) => void;
};
/**
 * Naw (Naam, Adres en Woonplaats) step
 */
export default function NawForm({
  defaultsValues: defaultsValues,
  onSubmit,
}: Props) {
  const { register, handleSubmit } = useForm<PersonalInfo>({
    defaultValues: defaultsValues,
  });

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <div className="grid grid-cols-[min-content_1fr] gap-3 [&>label]:text-right">
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
      <div className="mt-6 flex justify-end">
        <Button type="submit">Volgende stap</Button>
      </div>
    </form>
  );
}
