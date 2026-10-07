"use client";
import { useSessionValues } from "@/lib/useSessionValues";
import { personalInfoSchema } from "../schemas";
import * as v from "valibot";
import { useData } from "@/lib/useData";

export default function ThanksPage() {
  const [personalInfo] = useSessionValues("personalInfo", personalInfoSchema);
  const [planId] = useSessionValues("basicInsurance", v.string());
  const [addonsIds] = useSessionValues(
    "additionalInsurance",
    v.array(v.string()),
  );
  const result = useData();
  const data =
    result.status === "success"
      ? {
          personal: personalInfo,
          basicInsurance: result.data.basicInsurance.find(
            (plan) => plan.id === planId,
          ),
          additionalInsurance: result.data.additionalInsurance.filter((addon) =>
            addonsIds?.includes(addon.id),
          ),
        }
      : undefined;
  return (
    <div className="mx-auto w-160 max-w-full">
      <div className="text-center">
        <h1 className="mb-6 text-xl">
          Bedankt voor het afronden van deze demo
        </h1>
        <p>
          In opdracht van{" "}
          <a
            className="text-brand hover:underline"
            href="https://www.zorgenzekerheid.nl/"
          >
            Zorgenzekerheid.nl
          </a>{" "}
          gemaakt door{" "}
          <a className="text-brand hover:underline" href="https://bfanger.nl">
            Bob Fanger
          </a>
        </p>
      </div>
      <h2 className="mt-8 mb-2 text-center text-lg">Ingevulde gegevens</h2>
      {data && (
        <pre className="max-w-full overflow-auto rounded-xl bg-slate-800 p-2 text-xs text-lime-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
