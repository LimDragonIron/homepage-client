import React, { forwardRef, useRef, useEffect, useState, useMemo } from "react";
import { FaGamepad } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GameCardsSlider from "../ui/GameCardsSlider";
import GameCardsBounce from "../ui/GameCardsBounce";
import GameCard from "../ui/GameCard";
import { fetchPublicGamesList } from "@/api/games";
import type { Game } from "@/types";
import type { CardType } from "@/types";
import useBreakpoint from "@/hooks/useBreakpoint";
import useInView from "@/hooks/useInView";

// 환경별 카드 크기, gap, 한 화면에 보여줄 개수
const CARD_CONFIGS = {
  mobile:  { width: 110, height: 160, gap: 8, show: 3 },
  tablet:  { width: 160, height: 210, gap: 12, show: 3 },
  desktop: { width: 220, height: 300, gap: 16, show: 3 },
};

// 재사용 가능한 static row 카드 리스트
function StaticRowCardList({
  cardList,
  cardWidth,
  cardHeight,
  onCardClick
}: {
  cardList: CardType[];
  cardWidth: number;
  cardHeight: number;
  onCardClick: (id: number) => void;
}) {
  return (
    <div className="flex w-full justify-center items-center gap-x-2 overflow-hidden" style={{ height: cardHeight }}>
      {cardList.map((game) => (
        <div
          key={game.id}
          style={{
            flex: `0 0 ${cardWidth}px`,
            width: cardWidth,
            height: cardHeight,
            minWidth: cardWidth,
            minHeight: cardHeight,
            pointerEvents: "auto",
            display: "flex",
          }}
        >
          <GameCard
            title={game.title}
            image={game.image}
            content={game.content}
            width={cardWidth}
            height={cardHeight}
            onClick={() => onCardClick(game.id)}
          />
        </div>
      ))}
    </div>
  );
}

function getCardList(gameList: Game[]): CardType[] {
  return gameList.map(game => ({
    id: game.id,
    title: game.title,
    content: game.content,
    image: game.files?.[0]?.url || "https://placehold.co/320x400?text=No+Image",
  }));
}

const GamesSection = forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>((props, ref) => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [gameList, setGameList] = useState<Game[]>([]);
  const [startIdx, setStartIdx] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [loading, setLoading] = useState(true);

  const bp = useBreakpoint();
  const { width: CARD_WIDTH, height: CARD_HEIGHT, gap: CARD_GAP, show: CARD_SHOW_COUNT } = CARD_CONFIGS[bp];

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") ref(sectionRef.current);
    else if (ref && "current" in ref && sectionRef.current)
      (ref as React.RefObject<HTMLElement>).current = sectionRef.current;
  }, [ref]);

  useEffect(() => {
    setLoading(true);
    fetchPublicGamesList(1, 20)
      .then(data => setGameList(data))
      .catch(() => setGameList([]))
      .finally(() => setLoading(false));
  }, []);

  const inView = useInView(sectionRef, { threshold: 0.5 });

  // 카드 데이터 변환 (useMemo로 최적화)
  const cardList: CardType[] = useMemo(() => getCardList(gameList), [gameList]);

  const handleCardClick = (id: number) => navigate(`/games/${id}`);

  // 분기 로직 함수화
  const cardCount = cardList.length;
  const isBounce = cardCount <= 3;
  const isStaticRow = cardCount > 3 && cardCount < 6;
  const isSlide = cardCount >= 6;

  // 슬라이드 타이머는 6개 이상에서만 동작!
  useEffect(() => {
    if (!inView || !isSlide) return;
    const timer = setInterval(() => { if (!isSliding) slideNext(); }, 2500);
    return () => clearInterval(timer);
  }, [inView, isSlide, isSliding, CARD_SHOW_COUNT, cardList.length]);

  function slideNext() {
    setIsSliding(true);
    setTimeout(() => {
      setStartIdx(prev => (prev + 1) % cardList.length);
      setIsSliding(false);
    }, 500);
  }

  if (loading) return null;
  if (!cardList.length) return null;

  return (
    <section
      ref={sectionRef}
      {...props}
      className={[
        "w-full",
        "min-h-[180px] sm:min-h-[220px] md:min-h-[300px] lg:min-h-[380px]",
        "py-8 sm:py-12 md:py-20 flex flex-col items-center justify-center relative",
        "bg-gradient-to-br from-[#181818] to-[#3d2f18]",
        props.className || ""
      ].join(" ")}
      style={props.style}
    >
      <div className="flex items-center justify-between w-full max-w-5xl mb-4 px-2 sm:px-8">
        <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2 text-white drop-shadow-lg font-serif"
          style={{ color: "#fff", textShadow: "0 1px 8px #000" }}>
          <FaGamepad className="text-[#fff]" />Games
        </h2>
        <span
          role="link" tabIndex={0}
          onClick={() => navigate("/games")}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") navigate("/games"); }}
          className="
            font-bold select-none cursor-pointer outline-none
            text-[#ffe16b] text-lg sm:text-xl
            hover:text-[#fffbe5] focus-visible:underline
            underline-offset-4 transition drop-shadow
            bg-transparent border-0 p-0 m-0 shadow-none
            font-inherit tracking-wide"
          aria-label="게임 전체 보기"
        >More</span>
      </div>
      <div className="w-full flex-1 flex items-center justify-center relative">
        <div
          className="w-full flex justify-center items-center relative"
          style={{
            minHeight: CARD_HEIGHT,
            height: CARD_HEIGHT,
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          {isBounce ? (
            <GameCardsBounce
              gameList={cardList}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
              cardGap={CARD_GAP}
              onCardClick={handleCardClick}
            />
          ) : isStaticRow ? (
            <StaticRowCardList
              cardList={cardList}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
              onCardClick={handleCardClick}
            />
          ) : (
            <GameCardsSlider
              gameList={cardList}
              startIdx={startIdx}
              cardWidth={CARD_WIDTH}
              cardHeight={CARD_HEIGHT}
              cardGap={CARD_GAP}
              showCount={CARD_SHOW_COUNT}
              onCardClick={handleCardClick}
            />
          )}
        </div>
      </div>
    </section>
  );
});
export default GamesSection;