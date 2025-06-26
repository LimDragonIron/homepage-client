import { useNavigate, useParams } from "react-router-dom";
import { fetchPublicGameDetail } from "@/api/games";
import { useQuery } from "@tanstack/react-query";
import type { Game } from "@/types";

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: game, isLoading, isError } = useQuery<Game>({
    queryKey: ["game", id],
    queryFn: () => fetchPublicGameDetail(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center mt-20">로딩중...</div>;
  if (isError || !game) return <div className="text-center mt-20">게임 정보를 불러올 수 없습니다.</div>;

  const image = game.files?.[0]?.url || "https://placehold.co/600x360?text=No+Image";
  const platformLinks = game.platformLinks ?? [];

  return (
    <section className="flex flex-col items-center w-full min-h-screen px-2 sm:px-4 md:px-8 bg-gradient-to-br from-[#181818] to-[#3d2f18] py-8">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-lg p-4 sm:p-8 mt-4">
        <img
          src={image}
          alt={game.title}
          className="w-full rounded-xl mb-6 object-cover max-h-[320px] sm:max-h-[420px]"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-[#181818] break-words">
          {game.title}
        </h1>
        {platformLinks.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3">
            {platformLinks.map((link) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffe16b] text-[#181818] font-bold px-3 py-1 rounded-lg shadow hover:bg-[#ffec9e] text-sm sm:text-base"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}
        <article
          className="prose prose-lg sm:prose-xl max-w-none text-[#222] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: game.content }}
        />
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/games")}
            className="bg-[#be9b5e] text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-[#a6803c] transition"
          >
            목록으로 가기
          </button>
        </div>
      </div>
    </section>
  );
}