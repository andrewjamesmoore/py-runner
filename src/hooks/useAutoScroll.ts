import { useEffect, RefObject } from "react";

export function useAutoScroll(
  ref: RefObject<HTMLElement>,
  dependencies: unknown[]
) {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, dependencies);
}