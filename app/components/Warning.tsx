import { twMerge } from "tailwind-merge";

type Props = {
  message: string;
  className?: string;
};
export default function Warning({ message, className }: Props) {
  if (!message) {
    return null;
  }
  return (
    <p className={twMerge("bg-red-900 p-3 text-center text-white", className)}>
      {message}
    </p>
  );
}
