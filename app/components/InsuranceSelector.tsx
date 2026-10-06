"use client";

import { useState } from "react";
import type { InsuranceItem } from "@/lib/useData";
import Button from "./Button";

type Props = {
  items: InsuranceItem[];
  defaultValue?: string;
  onSelect: (item: InsuranceItem) => void;
};

export default function InsuranceSelector({
  items,
  defaultValue,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<InsuranceItem["id"] | undefined>(
    defaultValue,
  );

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const item = items.find((i) => i.id === selected);
        if (item) {
          onSelect(item);
        }
      }}
    >
      {items.map((item) => (
        <label key={item.id} className="flex items-start gap-2">
          <input
            className="mt-1.5"
            type="radio"
            name="insurance"
            value={item.id}
            required
            checked={selected === item.id}
            onChange={() => setSelected(item.id)}
          />
          <div>
            <h3 className="text-lg">{item.name}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
          <div className="ml-auto">
            <div>&euro; {item.price.toFixed(2)}</div>
            <div className="text-xs">per maand</div>
          </div>
        </label>
      ))}
      <div className="flex justify-end">
        <Button>Volgende stap</Button>
      </div>
    </form>
  );
}
