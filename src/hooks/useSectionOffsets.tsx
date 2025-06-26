import { useLayoutEffect, useState } from "react";

/**
 * useSectionOffsets
 * ----------------------------------------------------------------------------
 * 여러 섹션의 ref 배열을 받아, 각 ref.current?.offsetTop 값을 배열로 반환하는 커스텀 훅입니다.
 * (섹션이 고정되어 있을 때, 의존성 배열에 ref들을 명시적으로 나열해야 정확하게 동작합니다.)
 *
 * @param {React.RefObject<HTMLElement>[]} refs - 섹션 ref 배열
 * @returns {number[]} - 각 섹션의 offsetTop 값 배열
 *
 * @example
 * const sectionRefs = [useRef(...), useRef(...), ...];
 * const offsets = useSectionOffsets(sectionRefs);
 */
export function useSectionOffsets(refs: React.RefObject<HTMLElement>[]) {
  const [offsets, setOffsets] = useState<number[]>(refs.map(() => 0));
  useLayoutEffect(() => {
    const calc = () => setOffsets(refs.map(ref => ref.current?.offsetTop ?? 0));
    setTimeout(calc, 0); // 보장!
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [refs[0], refs[1], refs[2], refs[3]]); // 고정 섹션이라면 명시적 나열!
  return offsets;
}