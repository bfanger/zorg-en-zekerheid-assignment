"use client";

import { useEffect, useState } from "react";

export type TypedResponse = {
  basicInsurance: Plan[];
  additionalInsurance: Addon[];
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type Addon = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type State =
  { status: "loading" | "error" } | { status: "success"; data: TypedResponse };

export function useData() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) =>
        setState({ status: "success", data: data as TypedResponse }),
      )
      .catch((err) => {
        console.warn(err);
        setState({ status: "error" });
      });
  }, []);

  return state;
}
