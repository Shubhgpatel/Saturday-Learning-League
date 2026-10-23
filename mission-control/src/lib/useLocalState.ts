"use client";

import { useCallback, useEffect, useRef, useState, type SetStateAction } from "react";

/**
 * useState that persists to localStorage. It renders `initial` on the server and
 * first client render (no hydration mismatch), then loads the stored value
 * after mount. Storage failures (private mode, blocked storage) are ignored, so
 * the app still works as plain in-memory state.
 */
export function useLocalState<T>(
  key: string,
  initial: T,
  validate?: (raw: unknown) => T,
): [T, (value: SetStateAction<T>) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  const validateRef = useRef(validate);

  useEffect(() => {
    validateRef.current = validate;
  });

  useEffect(() => {
    let next: T | undefined;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        next = validateRef.current ? validateRef.current(parsed) : (parsed as T);
      }
    } catch {
      // ignore unreadable storage
    }
    // Loading persisted client-only state after mount is the intended pattern here.
    if (next !== undefined) setValue(next);
    setLoaded(true);
  }, [key]);

  const set = useCallback(
    (action: SetStateAction<T>) => {
      setValue((prev) => {
        const next =
          typeof action === "function" ? (action as (p: T) => T)(prev) : action;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // ignore quota / privacy errors
        }
        return next;
      });
    },
    [key],
  );

  return [value, set, loaded];
}
