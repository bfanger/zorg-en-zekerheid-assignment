"use client";

import { useState } from "react";
import type { Plan } from "@/lib/useData";
import Button from "./Button";
import Link from "next/link";

type Props = {
  plans: Plan[];
  defaultValue?: string;
  onSelect: (item: Plan) => void;
};
export default function InsuranceSelector({
  plans,
  defaultValue,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<Plan["id"] | undefined>(
    defaultValue,
  );

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const item = plans.find((i) => i.id === selected);
        if (item) {
          onSelect(item);
        }
      }}
    >
      {plans.map((plan) => (
        <label key={plan.id} className="flex items-start gap-2">
          <input
            className="mt-1.5"
            type="radio"
            name="insurance"
            value={plan.id}
            required
            checked={selected === plan.id}
            onChange={() => setSelected(plan.id)}
          />
          <div>
            <h3 className="text-lg">{plan.name}</h3>
            <p className="text-sm text-muted">{plan.description}</p>
          </div>
          <div className="ml-auto">
            <div>&euro;&nbsp;{plan.price.toFixed(2)}</div>
            <div className="text-xs">per maand</div>
          </div>
        </label>
      ))}
      <div className="mt-8 flex items-center justify-between">
        <Link href="?step=naw" className="text-muted hover:text-black">
          Terug
        </Link>
        <Button>Volgende stap</Button>
      </div>
    </form>
  );
}
