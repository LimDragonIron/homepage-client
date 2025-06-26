import { useState, useEffect } from "react";
import type { RefObject } from "react";

/**
 * useInView
 * ----------------------------------------------------------------------------
 * Intersection Observer를 활용하여 특정 요소(ref)가 뷰포트(Viewport)에 들어왔는지 여부를 반환하는 커스텀 훅입니다.
 *
 * @param {RefObject<HTMLElement | null>} ref - 관찰할 HTMLElement의 ref
 * @param {IntersectionObserverInit} [options] - IntersectionObserver 옵션 (root, threshold 등)
 * @returns {boolean} - 요소가 뷰포트에 있으면 true, 아니면 false
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const inView = useInView(ref, { threshold: 0.5 });
 */
export default function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return inView;
}