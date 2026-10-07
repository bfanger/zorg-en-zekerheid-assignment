"use client";

import { useState } from "react";
import type { Plan, Addon } from "@/lib/useData";
import Button from "./Button";
import Cart from "./Cart";
import Link from "next/link";

type Props = {
  plan?: Plan;
  addons: Addon[];
  defaultValues?: string[];
  onSelect: (items: Addon[]) => void;
};

export default function AddonsForm({
  plan,
  addons,
  defaultValues,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string[]>(defaultValues ?? []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const chosen = addons.filter((i) => selected.includes(i.id));
        onSelect(chosen);
      }}
    >
      <div className="flex grid-cols-[1fr_10rem] flex-col gap-8 sm:grid">
        <div className="flex flex-col gap-4">
          {addons.map((item) => (
            <label key={item.id} className="flex items-start gap-2">
              <input
                className="mt-1.5"
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => toggle(item.id)}
              />
              <div>
                <h3 className="text-lg">{item.name}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
              <div className="ml-auto w-max">
                <div>&euro;&nbsp;{item.price.toFixed(2)}</div>
                <div className="text-xs">per&nbsp;maand</div>
              </div>
            </label>
          ))}
        </div>
        <Cart
          items={[
            ...(plan ? [plan] : []),
            ...addons.filter((item) => selected.includes(item.id)),
          ]}
        />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Link href="?step=insurance" className="text-muted hover:text-black">
          Terug
        </Link>
        <Button>Voltooien</Button>
      </div>
    </form>
  );
}
