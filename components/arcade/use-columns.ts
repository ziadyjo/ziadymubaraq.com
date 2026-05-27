"use client";

import { useSyncExternalStore } from "react";
import { DESKTOP_COLUMNS, getColumnsForWidth } from "./engine";

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getSnapshot(): number {
  return getColumnsForWidth(window.innerWidth);
}

function getServerSnapshot(): number {
  return DESKTOP_COLUMNS;
}

/**
 * Responsive board width, read through {@link useSyncExternalStore} so it is
 * hydration-safe (server renders the desktop width) and updates on resize
 * without an effect or `setState`.
 */
export function useColumns(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
