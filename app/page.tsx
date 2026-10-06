"use client";

import NawForm from "./components/NawForm";
import { personalInfoSchema } from "./schemas";
import { useSessionValues } from "@/lib/useSessionValues";

export default function Home() {
  const [values, setValues] = useSessionValues("personal", personalInfoSchema);

  return <NawForm onSubmit={setValues} defaultsValues={values} />;
}
