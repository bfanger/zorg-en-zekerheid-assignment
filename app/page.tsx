"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as v from "valibot";
import NawForm from "./components/NawForm";
import InsuranceSelector from "./components/InsuranceSelector";
import Warning from "./components/Warning";
import AddonsForm from "./components/AddonsForm";
import Spinner from "./components/Spinner";
import { PersonalInfo, personalInfoSchema } from "./schemas";
import { useSessionValues } from "@/lib/useSessionValues";
import { Addon, Plan, useData } from "@/lib/useData";
import { useBrowser } from "@/lib/useBrowser";
import { maxStep } from "@/lib/maxStep";

export default function HomePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const router = useRouter();
  const browser = useBrowser();
  const searchParams = useSearchParams();
  const [personalInfo, setPersonalInfo] = useSessionValues(
    "personalInfo",
    personalInfoSchema,
  );
  const [planId, setPlanId] = useSessionValues("basicInsurance", v.string());
  const [addonsIds, setAddonIds] = useSessionValues(
    "additionalInsurance",
    v.array(v.string()),
  );
  const result = useData();

  const plan =
    planId && result.status === "success"
      ? result.data.basicInsurance.find((plan) => plan.id === planId)
      : undefined;
  const stepParam = searchParams.get("step");
  const step = maxStep(stepParam, personalInfo, plan);

  function handleSubmit(data: {
    personal: PersonalInfo;
    basicInsurance: Plan;
    additionalInsurance: Addon[];
  }) {
    console.info(data);
    router.push("/thanks");
  }

  if (
    !browser ||
    (result.status === "loading" && (stepParam === null || stepParam === "naw"))
  ) {
    return <Spinner />;
  }
  if (result.status === "error") {
    return (
      <Warning message="Excuses, er is een probleem opgetreden bij het inladen van de opties" />
    );
  }
  return (
    <div className="mx-auto w-full max-w-160">
      {step === "naw" && (
        <NawForm
          onSubmit={(naw) => {
            setPersonalInfo(naw);
            router.push("/?step=insurance");
          }}
          defaultValues={personalInfo}
        />
      )}
      {step === "insurance" && (
        <>
          {result.status === "success" && (
            <InsuranceSelector
              plans={result.data.basicInsurance}
              defaultValue={planId}
              onSelect={(item) => {
                setPlanId(item.id);
                router.push("/?step=addons");
              }}
            />
          )}
        </>
      )}
      {step === "addons" && (
        <>
          {result.status === "success" && (
            <AddonsForm
              plan={plan}
              addons={result.data.additionalInsurance}
              defaultValues={addonsIds}
              onSelect={(items) => {
                setAddonIds(items.map((i) => i.id));
                if (!personalInfo || !plan) {
                  throw new Error("Data from previous steps is missing");
                }
                handleSubmit({
                  personal: personalInfo,
                  basicInsurance: plan,
                  additionalInsurance: items,
                });
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
