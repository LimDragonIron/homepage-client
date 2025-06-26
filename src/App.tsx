import Layout from "./components/layout/Layout";
import HeroSection from "./components/sections/HeroSection";
import PromotionSection from "./components/sections/PromotionSection";
import GamesSection from "./components/sections/GamesSection";
import NewsSection from "./components/sections/NewsSection";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import GameDetailPage from "@/components/pages/GameDetailPage";
import GamesListPage from "./components/pages/GamesListPage";
import NewsDetailPage from "./components/pages/NewsDetailPage";
import NewsListPage from "./components/pages/NewsListPage";

// 섹션별 offset 계산
function useSectionOffsets(refs: React.RefObject<HTMLElement>[]) {
  const [offsets, setOffsets] = useState<number[]>(refs.map(() => 0));
  useLayoutEffect(() => {
    function calc() {
      setOffsets(refs.map(ref => ref.current?.offsetTop ?? 0));
    }
    setTimeout(calc, 0);
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [refs[0], refs[1], refs[2], refs[3]]);
  return offsets;
}

function MainPage() {
  const heroRef = useRef<HTMLElement>(null!);
  const promoRef = useRef<HTMLElement>(null!);
  const gamesRef = useRef<HTMLElement>(null!);
  const newsRef = useRef<HTMLElement>(null!);

  const sectionRefs = [heroRef, promoRef, gamesRef, newsRef];
  const sectionOffsets = useSectionOffsets(sectionRefs);
  const { scrollY } = useScroll();

  // 배경색 전환: Games 섹션에서만 검정, 나머지는 흰색
  const bgColor = useTransform(
    scrollY,
    [
      sectionOffsets[0] ?? 0,
      sectionOffsets[1] ?? 800,
      sectionOffsets[2] ?? 1600,
      sectionOffsets[3] ?? 2400,
    ],
    ["#fffdfa", "#fffdfa", "#181818", "#fffdfa"]
  );

  useEffect(() => {
    const unsubscribe = bgColor.on("change", (val) => {
      document.body.style.background = val;
      document.body.style.transition = "background 0.45s";
    });
    return () => {
      unsubscribe();
      document.body.style.background = "#fffdfa";
    };
  }, [bgColor]);

  return (
    <>
      <HeroSection ref={heroRef} />
      <PromotionSection ref={promoRef} />
      <GamesSection ref={gamesRef} />
      <NewsSection ref={newsRef} />
    </>
  );
}

export default function App() {
  // 라우터를 사용하여 상세 페이지를 분리
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/games" element={<GamesListPage />} />
        <Route path="/games/:id" element={<GameDetailPage />} />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
      </Routes>
    </Layout>
  );
}