import { useId, type InputHTMLAttributes } from "react";

type Props = {
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "label" | "className">;

export default function TextInput({ label, type = "text", ...rest }: Props) {
  const autoId = useId();
  const id = rest.id ?? autoId;
  return (
    <>
      <label htmlFor={id}>
        {label}
        {rest.required ? "*" : ""}
      </label>
      <input
        id={id}
        type={type}
        className="w-full min-w-0 border p-3"
        {...rest}
      />
    </>
  );
}
