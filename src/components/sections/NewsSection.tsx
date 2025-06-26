import React, { forwardRef, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchPublicNewsList } from "@/api/news";

type NewsCard = {
  id: number;
  title: string;
  date: string;
  image: string;
};

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
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

const NewsSection = forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>((props, ref) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const [newsList, setNewsList] = useState<NewsCard[]>([]);
  const [loading, setLoading] = useState(true);

  const bp = useBreakpoint();

  // forwardRef에서 ref를 올바르게 전달
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(sectionRef.current);
    } else if (ref && "current" in ref) {
      if (sectionRef.current) {
        (ref as React.RefObject<HTMLElement>).current = sectionRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    setLoading(true);
    fetchPublicNewsList(1, 3)
      .then(({ newsList }) => {
        setNewsList(
          newsList.map(news => ({
            id: news.id,
            title: news.title,
            date: news.publishedAt?.slice(0, 10) ?? "",
            image: news.files?.[0]?.url || "https://placehold.co/320x180?text=No+Image"
          }))
        );
      })
      .catch(() => setNewsList([]))
      .finally(() => setLoading(false));
  }, []);

  // 반응형 카드
  const cardHeight =
    bp === "mobile" ? 160 : bp === "tablet" ? 200 : 260;

  if (loading) {
    return (
      <section
        ref={sectionRef}
        {...props}
        className="w-full min-h-[200px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[420px] py-8 md:py-12 flex flex-col items-center justify-center"
        style={{ ...props.style }}
      >
        <div className="text-center text-gray-400 text-lg">Loading...</div>
      </section>
    );
  }

  if (!newsList.length) {
    return (
      <section
        ref={sectionRef}
        {...props}
        className="w-full min-h-[200px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[420px] py-8 md:py-12 flex flex-col items-center justify-center"
        style={{ ...props.style }}
      >
        <div className="text-center text-gray-400 text-lg">등록된 뉴스가 없습니다.</div>
      </section>
    );
  }

  const handleCardClick = (id: number) => {
    navigate(`/news/${id}`);
  };

  return (
    <section
      ref={sectionRef}
      {...props}
      className="w-full min-h-[200px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[420px] py-8 md:py-12 flex flex-col items-center justify-center"
      style={{ ...props.style }}
    >
      <div className="w-full flex items-center justify-between mb-4 px-4 sm:px-8 max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-2xl font-bold text-[#a47e3b] font-serif">News</h2>
        <span
          role="link"
          tabIndex={0}
          onClick={() => navigate("/news")}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") navigate("/news");
          }}
          className="
            font-bold select-none cursor-pointer outline-none
            text-[#a47e3b]
            text-sm sm:text-base md:text-lg
            hover:text-[#ffd700]
            focus-visible:underline
            underline-offset-4
            transition
            drop-shadow
          "
          style={{
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            boxShadow: "none",
            appearance: "none",
            fontFamily: "inherit",
            letterSpacing: "0.04em"
          }}
          aria-label="뉴스 전체 보기"
        >
          More
        </span>
      </div>
      <div className="flex-1 flex flex-row w-full gap-2 sm:gap-4 md:gap-8 max-w-5xl mx-auto">
        {newsList.map((news, idx) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.12 }}
            className="flex-1 flex flex-col items-center bg-white rounded-xl shadow p-2 sm:p-3 md:p-4 min-w-0 border border-[#e6dcc2] cursor-pointer hover:shadow-lg transition"
            style={{ maxHeight: cardHeight }}
            onClick={() => handleCardClick(news.id)}
            tabIndex={0}
            role="link"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(news.id);
            }}
            aria-label={`${news.title} 상세 보기`}
          >
            <div className="w-full aspect-[16/10] max-h-[110px] sm:max-h-[140px] md:max-h-[180px] lg:max-h-[220px] overflow-hidden mb-2 sm:mb-3 rounded-lg shadow border border-[#e6dcc2]">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover rounded-lg"
                style={{ background: "#f6f1e7" }}
              />
            </div>
            <div className="text-xs text-[#b6a485] mb-1">{news.date}</div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-center text-[#5c4523] font-serif">{news.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});
export default NewsSection;