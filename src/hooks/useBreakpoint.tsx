import { useState, useEffect } from "react";

/**
 * useBreakpoint
 * ----------------------------------------------------------------------------
 * 현재 브라우저의 화면 크기에 따라 "mobile", "tablet", "desktop" 중 하나를 반환하는 반응형 커스텀 훅입니다.
 *
 * - mobile: width < 640px
 * - tablet: 640px <= width < 1024px
 * - desktop: width >= 1024px
 *
 * @returns {"mobile" | "tablet" | "desktop"} - 현재 화면 크기 구간
 *
 * @example
 * const bp = useBreakpoint();
 * if (bp === "mobile") ...
 */
export default function useBreakpoint() {
  const [bp, setBp] = useState<"mobile"|"tablet"|"desktop">("desktop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}