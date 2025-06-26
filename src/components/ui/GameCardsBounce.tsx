import { motion, easeInOut } from "framer-motion";
import GameCard from "./GameCard";
import type { CardType } from "@/types";

/**
 * GameCardsBounce
 * ----------------------------------------------------------------------------
 * 여러 게임 카드를 가로로 나열하고, 부드러운 bounce 애니메이션을 적용해 보여주는 컴포넌트입니다.
 * - 카드 클릭시 onCardClick(id) 콜백이 실행됩니다.
 * - 카드별로 bounce 애니메이션이 반복됩니다.
 *
 * @param {object} props
 * @param {CardType[]} props.gameList - 게임 카드 데이터 배열
 * @param {number} props.cardWidth - 카드 가로 px
 * @param {number} props.cardHeight - 카드 세로 px
 * @param {number} props.cardGap - 카드 간격(px)
 * @param {(id: number) => void} [props.onCardClick] - 카드 클릭 핸들러 (옵션)
 *
 * @example
 * <GameCardsBounce gameList={games} cardWidth={180} cardHeight={260} cardGap={24} onCardClick={id => ...}/>
 */
type Props = {
  gameList: CardType[];
  cardWidth: number;
  cardHeight: number;
  cardGap: number;
  onCardClick?: (id: number) => void;
};

export default function GameCardsBounce({
  gameList,
  cardWidth,
  cardHeight,
  cardGap,
  onCardClick,
}: Props) {
  const bounce = {
    animate: {
      y: [0, -24, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  };
  // 중앙 배치: flex 사용
  return (
    <div
      className="flex justify-center items-center w-full h-full"
      style={{ gap: `${cardGap}px` }}
    >
      {gameList.map((game, idx) => (
        <motion.div
          key={game.title + "-" + idx}
          style={{
            width: cardWidth,
            height: cardHeight,
            minWidth: cardWidth,
            minHeight: cardHeight,
            pointerEvents: "auto",
            display: "flex",
          }}
          animate="animate"
          variants={bounce}
        >
          <GameCard
            image={game.image}
            title={game.title}
            width={cardWidth}
            height={cardHeight}
            onClick={onCardClick ? () => onCardClick(game.id) : undefined}
          />
        </motion.div>
      ))}
    </div>
  );
}