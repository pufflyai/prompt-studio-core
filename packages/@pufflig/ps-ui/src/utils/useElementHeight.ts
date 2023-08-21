import useResizeObserver from "@react-hook/resize-observer";
import { useLayoutEffect, useState } from "react";

export function useElementHeight<T extends HTMLElement = HTMLDivElement>(target: React.RefObject<T>) {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!target.current) return;
    const height = target.current.getBoundingClientRect().height;
    setHeight(height);
  }, [target]);

  useResizeObserver(target, (entry) => setHeight(entry.contentRect.height));

  return height;
}
