"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as v from "valibot";
import NawForm from "./components/NawForm";
import InsuranceSelector from "./components/InsuranceSelector";
import { personalInfoSchema } from "./schemas";
import { useSessionValues } from "@/lib/useSessionValues";
import { useData } from "@/lib/useData";
import { useBrowser } from "@/lib/useBrowser";
import { maxStep } from "@/lib/maxStep";

export default function Home() {
  const router = useRouter();
  const browser = useBrowser();
  const searchParams = useSearchParams();
  const [personalInfo, setPersonalInfo] = useSessionValues(
    "personal",
    personalInfoSchema,
  );
  const [basic, setBasic] = useSessionValues("basic", v.string());
  const result = useData();
  const step = maxStep(searchParams.get("step"), personalInfo, basic);

  if (!browser) {
    return <div>Bezig met laden...</div>;
  }
  return (
    <div className="mx-auto w-full max-w-150">
      {step === "naw" && (
        <NawForm
          onSubmit={(naw) => {
            setPersonalInfo(naw);
            router.push("/?step=insurance");
          }}
          defaultsValues={personalInfo}
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
              defaultValue={basic}
              onSelect={(item) => {
                setBasic(item.id);
                router.push("/?step=addons");
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
