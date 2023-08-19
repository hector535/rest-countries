import { useRef, useEffect } from "react";

export function useCloseElement<T extends HTMLElement>(cb: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      cb();
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, []);

  return ref;
}
