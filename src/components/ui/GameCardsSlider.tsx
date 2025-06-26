import { motion } from "framer-motion";
import GameCard from "./GameCard";
import type { CardType } from "@/types";

/**
 * GameCardsSlider
 * ----------------------------------------------------------------------------
 * 게임 카드들을 가로 슬라이드 형태로 보여주는 컴포넌트입니다.
 * - 카드 너비/간격/슬라이드 시작 인덱스를 받아 translateX로 이동합니다.
 * - 화면에 여러 개(showCount) 카드 표시 가능.
 *
 * @param {object} props
 * @param {CardType[]} props.gameList - 카드 데이터 배열
 * @param {number} props.startIdx - 슬라이드 시작 인덱스(첫번째로 보이는 카드 idx)
 * @param {number} props.cardWidth - 카드 가로(px)
 * @param {number} props.cardHeight - 카드 세로(px)
 * @param {number} props.cardGap - 카드 간격(px)
 * @param {number} props.showCount - 한 화면에 보여줄 카드 개수
 * @param {(id: number) => void} [props.onCardClick] - 카드 클릭 핸들러(옵션)
 *
 * @example
 * <GameCardsSlider gameList={...} startIdx={0} cardWidth={180} cardHeight={260} cardGap={24} showCount={3}/>
 */
type Props = {
  gameList: CardType[];
  startIdx: number;
  cardWidth: number;
  cardHeight: number;
  cardGap: number;
  showCount: number; // 한 화면에 몇 개 보여줄지
  onCardClick?: (id: number) => void;
};

export default function GameCardsSlider({
  gameList, startIdx, cardWidth, cardHeight, cardGap, onCardClick,
}: Props) {
  // 카드 이동을 위한 translateX 계산
  // 카드 하나 너비+gap 만큼 * startIdx 만큼 이동
  const slideWidth = cardWidth + cardGap;
  const offset = -(slideWidth * startIdx);

  return (
    <div
      className="overflow-hidden w-full h-full"
      style={{
        width: "100%",
        height: cardHeight,
      }}
    >
      <motion.div
        className="flex"
        style={{
          width: slideWidth * gameList.length,
          gap: `${cardGap}px`,
          transform: `translateX(${offset}px)`,
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {gameList.map((game, idx) => (
          <div
            key={game.title + "-" + idx}
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
              onClick={onCardClick ? () => onCardClick(game.id) : undefined}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}