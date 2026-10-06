"use client";

import { useCallback, useState } from "react";
import { BaseIssue, parse, type BaseSchema, type InferOutput } from "valibot";

export function useSessionValues<
  T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  key: string,
  schema: T,
): [InferOutput<T> | undefined, (values: InferOutput<T> | undefined) => void] {
  const [state, setState] = useState<InferOutput<T> | undefined>(() => {
    try {
      const json = sessionStorage.getItem(key);
      if (json === null) {
        return undefined;
      }
      return parse(schema, JSON.parse(json));
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  });

  const setValues = useCallback(
    (values: InferOutput<T>) => {
      try {
        const verified = parse(schema, values);
        setState(verified);
        sessionStorage.setItem(key, JSON.stringify(verified));
      } catch (err) {
        console.warn(err);
      }
    },
    [key, schema],
  );

  return [state, setValues] as const;
}
