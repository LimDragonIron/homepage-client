import { useNavigate } from "react-router-dom";
import type { PublicNews } from "@/api/news";

/**
 * NewsListCard
 * ----------------------------------------------------------------------------
 * 뉴스 목록에서 사용되는 단일 뉴스 카드 컴포넌트입니다.
 * - 썸네일, 날짜, 제목 등을 표시합니다.
 * - 카드 클릭시 해당 뉴스 상세 페이지로 이동합니다.
 * - 키보드 접근성(Enter/Space) 및 ARIA 라벨 지원
 *
 * @param {object} props
 * @param {PublicNews} props.news - 뉴스 데이터 객체
 *
 * @example
 * <NewsListCard news={news} />
 */
export function NewsListCard({ news }: { news: PublicNews }) {
  const navigate = useNavigate();
  const image = news.files?.[0]?.url || "https://placehold.co/320x180?text=No+Image";
  return (
    <div
      className="flex flex-col bg-white rounded-xl shadow-md border border-[#e6dcc2] overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/news/${news.id}`)}
      tabIndex={0}
      role="link"
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") navigate(`/news/${news.id}`);
      }}
      aria-label={`${news.title} 상세 보기`}
    >
      <img
        src={image}
        alt={news.title}
        className="w-full h-[180px] object-cover"
        style={{ background: "#f6f1e7" }}
      />
      <div className="flex flex-col flex-1 p-3">
        <div className="text-xs text-[#b6a485] mb-1">{news.publishedAt?.slice(0, 10)}</div>
        <div className="text-base font-bold text-[#5c4523] font-serif line-clamp-2 mb-2">{news.title}</div>
      </div>
    </div>
  );
}