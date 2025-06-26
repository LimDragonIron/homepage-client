import API from "./axiosInstance";
import type { ResponseBuilder, FileType } from "@/types";

/**
 * 공개 뉴스 타입
 */
export type PublicNews = {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  files?: FileType[];
};

/**
 * 공개 뉴스 리스트 조회 API
 * ----------------------------------------------------------------------------
 * 공개된 뉴스 목록을 페이지네이션 방식으로 가져옵니다. (로그인/인증 필요 없음)
 *
 * @param {number} [page=1] - 조회할 페이지 번호
 * @param {number} [pageSize=10] - 페이지당 아이템 개수
 * @returns {Promise<{ newsList: PublicNews[], totalPages: number }>} - 뉴스 목록 및 전체 페이지 수
 * @throws {Error} 조회 실패 시 에러 발생
 *
 * @example
 * const { newsList, totalPages } = await fetchPublicNewsList(1, 10);
 */
export async function fetchPublicNewsList(page = 1, pageSize = 10): Promise<{ newsList: PublicNews[], totalPages: number }> {
  const res = await API.get<ResponseBuilder<{ newsList: PublicNews[], totalPages: number }>>(
    `/news/public?page=${page}&pageSize=${pageSize}`
  );
  if (res.data.code !== "SUCCESS" || !res.data.data?.newsList) {
    throw new Error(res.data.message || "공개 뉴스 조회 실패");
  }
  return {
    newsList: res.data.data.newsList,
    totalPages: res.data.data.totalPages ?? 1,
  };
}

/**
 * 공개 뉴스 상세 조회 API
 * ----------------------------------------------------------------------------
 * 공개된 뉴스의 상세 정보를 조회합니다. (로그인/인증 필요 없음)
 *
 * @param {number} id - 뉴스 고유 id
 * @returns {Promise<PublicNews>} - 뉴스 상세 데이터
 * @throws {Error} 조회 실패 시 에러 발생
 *
 * @example
 * const news = await fetchPublicNewsDetail(123);
 */
export async function fetchPublicNewsDetail(id: number): Promise<PublicNews> {
  const res = await API.get<ResponseBuilder<{ news: PublicNews }>>(
    `/news/public/${id}`
  );
  if (res.data.code !== "SUCCESS" || !res.data.data?.news) {
    throw new Error(res.data.message || "뉴스 상세 조회 실패");
  }
  return res.data.data.news;
}