import { useEffect, useState, useRef, useCallback } from "react";
import { fetchPublicNewsList } from "@/api/news";
import type { PublicNews } from "@/api/news";
import { NewsListCard } from "@/components/ui/NewsListCard";

export default function NewsListPage() {
  const [newsList, setNewsList] = useState<PublicNews[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤 데이터 로드
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    fetchPublicNewsList(page, 12)
      .then((data: any) => {
        const newNews = data.newsList || data;
        setNewsList((prev) => {
          const prevIds = new Set(prev.map((n: PublicNews) => n.id));
          const filtered = newNews.filter((n: PublicNews) => !prevIds.has(n.id));
          return [...prev, ...filtered];
        });
        setHasMore(page < (data.totalPages || 1));
        setPage((prev) => prev + 1);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [loading, hasMore, page]);

  // 최초 로딩
  useEffect(() => {
    setNewsList([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchPublicNewsList(1, 12)
      .then((data: any) => {
        const newNews = data.newsList || data;
        setNewsList(newNews);
        setHasMore(1 < (data.totalPages || 1));
        setPage(2);
        setError(null);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  // IntersectionObserver 세팅
  useEffect(() => {
    if (!hasMore || loading) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMore, hasMore, loading]);

  if (loading && newsList.length === 0)
    return <div className="text-center mt-20">로딩중...</div>;
  if (error && newsList.length === 0)
    return <div className="text-center mt-20 text-red-600">에러: {error}</div>;

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-2 sm:px-6 md:px-8 bg-neutral-50 py-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <NewsListCard key={news.id} news={news} />
          ))}
        </div>
        {/* 무한 스크롤 트리거 */}
        <div ref={observerRef} className="h-12 flex items-center justify-center">
          {loading && <span className="text-gray-500 mt-6">불러오는 중...</span>}
          {!hasMore && newsList.length > 0 && (
            <span className="text-gray-400 mt-6">모든 뉴스를 불러왔습니다.</span>
          )}
        </div>
      </div>
    </section>
  );
}