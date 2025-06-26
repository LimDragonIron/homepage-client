import { useNavigate } from "react-router-dom";
import type { Game } from "@/types";

/**
 * GameListCard
 * ----------------------------------------------------------------------------
 * 게임 목록에서 사용되는 단일 게임 정보 카드 컴포넌트입니다.
 * - 썸네일, 제목, 플랫폼 링크(버튼) 등을 표시합니다.
 * - 카드 클릭시 해당 게임 상세 페이지로 이동합니다.
 *
 * @param {object} props
 * @param {Game} props.game - 게임 데이터 객체
 *
 * @example
 * <GameListCard game={game} />
 */
interface GameListCardProps {
  game: Game;
}

export function GameListCard({ game }: GameListCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center overflow-hidden"
      style={{
        minHeight: 280,
        boxShadow:
          "0 2px 8px 0 rgba(30, 41, 59, 0.04), 0 1.5px 8px 0 rgba(0,0,0,0.06)",
      }}
      onClick={() => navigate(`/games/${game.id}`)}
    >
      <img
        src={game.files?.[0]?.url || "https://placehold.co/400x240?text=No+Image"}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="w-full flex-1 flex flex-col justify-center items-center p-4 gap-3 bg-white">
        <h2
          className="text-lg sm:text-xl font-bold text-gray-900 text-center break-keep"
          style={{
            wordBreak: "keep-all",
            letterSpacing: "0.01em",
            lineHeight: 1.3,
            textShadow: "0 1px 3px rgba(255,255,255,0.12)",
          }}
        >
          {game.title}
        </h2>
        {game.platformLinks && game.platformLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {game.platformLinks.map((link) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full border border-gray-300 font-semibold text-sm transition bg-gray-50 text-gray-900 hover:bg-blue-600 hover:text-white shadow-sm"
                style={{
                  minWidth: 68,
                  textAlign: "center",
                  letterSpacing: "0.01em",
                  transition: "background 0.15s, color 0.15s",
                }}
                onClick={e => e.stopPropagation()}
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}