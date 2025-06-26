import { useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * useSectionBackground
 * ----------------------------------------------------------------------------
 * 스크롤 위치에 따라 body의 background 색상을 동적으로 변경하는 커스텀 훅입니다.
 * (framer-motion 필요)
 *
 * @param {number[]} sectionOffsets - 각 섹션의 시작 offsetTop 값 배열
 * @param {string[]} colors - 각 섹션에 대응하는 색상 배열
 *
 * @example
 * useSectionBackground([0, 500, 1000], ["#fff", "#eee", "#333"]);
 */
export function useSectionBackground(
  sectionOffsets: number[],
  colors: string[]
) {
  const { scrollY } = useScroll();

  // 스크롤 위치에 따라 색상 변환
  const bgColor = useTransform(scrollY, sectionOffsets, colors);

  // body에 색상 적용
  useEffect(() => {
    const unsubscribe = bgColor.on("change", (val) => {
      document.body.style.transition = "background 0.5s";
      document.body.style.background = val;
    });
    return () => {
      unsubscribe();
      document.body.style.background = "#fff";
    };
  }, [bgColor]);
}