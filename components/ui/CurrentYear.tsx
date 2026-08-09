"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear();

export function CurrentYear({ initialYear }: { initialYear: number }) {
  const year = useSyncExternalStore(subscribe, getCurrentYear, () => initialYear);

  return <time dateTime={String(year)}>{year}</time>;
}
