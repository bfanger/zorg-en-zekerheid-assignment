import { type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ className, ...props }: Props) {
  return (
    <button
      className={twMerge(
        "block cursor-pointer bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-hover",
        className,
      )}
      {...props}
    />
  );
}
