import { useNavigate, useParams } from "react-router-dom";
import { fetchPublicNewsDetail } from "@/api/news";
import { useQuery } from "@tanstack/react-query";
import type { PublicNews } from "@/api/news";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: news, isLoading, isError } = useQuery<PublicNews>({
    queryKey: ["news", id],
    queryFn: () => fetchPublicNewsDetail(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center mt-20">로딩중...</div>;
  if (isError || !news) return <div className="text-center mt-20">뉴스 정보를 불러올 수 없습니다.</div>;

  const image = news.files?.[0]?.url || "https://placehold.co/600x360?text=No+Image";

  return (
    <section className="flex flex-col items-center w-full min-h-screen px-2 sm:px-4 md:px-8 bg-gradient-to-br from-[#fffdfa] to-[#f7e9c2] py-8">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-lg p-4 sm:p-8 mt-4">
        <img
          src={image}
          alt={news.title}
          className="w-full rounded-xl mb-6 object-cover max-h-[320px] sm:max-h-[420px]"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-[#a47e3b] break-words">
          {news.title}
        </h1>
        <div className="mb-4 text-sm text-[#b6a485]">{news.publishedAt?.slice(0, 10)}</div>
        <article
          className="prose prose-lg sm:prose-xl max-w-none text-[#222] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/news")}
            className="bg-[#a47e3b] text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-[#bfa25c] transition"
          >
            목록으로 가기
          </button>
        </div>
      </div>
    </section>
  );
}