"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as v from "valibot";
import NawForm from "./components/NawForm";
import InsuranceSelector from "./components/InsuranceSelector";
import { personalInfoSchema } from "./schemas";
import { useSessionValues } from "@/lib/useSessionValues";
import { useData } from "@/lib/useData";
import { useBrowser } from "@/lib/useBrowser";

const stepSchema = v.fallback(
  v.union([v.literal("naw"), v.literal("insurance"), v.literal("addons")]),
  "naw",
);

export default function Home() {
  const router = useRouter();
  const browser = useBrowser();
  const searchParams = useSearchParams();
  const [values, setValues] = useSessionValues("personal", personalInfoSchema);
  const result = useData();
  const step = v.parse(stepSchema, searchParams.get("step"));
  if (!browser) {
    return <div>Bezig met laden...</div>;
  }
  return (
    <div className="mx-auto w-full max-w-150">
      {step === "naw" && (
        <NawForm
          onSubmit={(naw) => {
            setValues(naw);
            router.push("/?step=insurance");
          }}
          defaultsValues={values}
        />
      )}
      {step === "insurance" && (
        <>
          {result.status === "loading" && <div>Bezig met laden...</div>}
          {result.status === "error" && (
            <div>
              Excuses, er is een probleem opgetreden bij het inladen van de
              opties
            </div>
          )}

          {result.status === "success" && (
            <InsuranceSelector
              items={result.data.basicInsurance}
              onSelect={(item) => {
                console.info(item);
                router.push("/?step=addons");
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
