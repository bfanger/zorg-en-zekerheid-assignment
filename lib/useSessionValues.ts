"use client";

import { useCallback, useState } from "react";
import * as v from "valibot";

export function useSessionValues<
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
  key: string,
  schema: T,
): [v.InferOutput<T> | undefined, (values: v.InferOutput<T>) => void] {
  const [state, setState] = useState<v.InferOutput<T> | undefined>(() => {
    try {
      const json = sessionStorage.getItem(key);
      if (json === null) {
        return undefined;
      }
      return v.parse(schema, JSON.parse(json));
    } catch (err) {
      console.warn(err);
      return undefined;
    }
  });

  const setValues = useCallback(
    (values: v.InferOutput<T>) => {
      try {
        const verified = v.parse(schema, values);
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
