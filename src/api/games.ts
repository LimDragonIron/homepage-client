import API from "./axiosInstance";
import type { ResponseBuilder } from "@/types";
import type { Game } from "@/types";

/**
 * 공개 게임 리스트 조회 API
 * ----------------------------------------------------------------------------
 * 인증/토큰 없이 공개된 게임 뉴스 목록을 페이지네이션 방식으로 조회합니다.
 * (publishedAt NOT NULL, 누구나 접근 가능)
 *
 * @param {number} [page=1] - 조회할 페이지 번호
 * @param {number} [pageSize=10] - 페이지당 아이템 개수
 * @returns {Promise<Game[]>} - 게임 뉴스 리스트
 * @throws {Error} 조회 실패 시 에러 발생
 *
 * @example
 * const games = await fetchPublicGamesList(1, 10);
 */
export async function fetchPublicGamesList(page = 1, pageSize = 10): Promise<Game[]> {
  const res = await API.get<ResponseBuilder<{
    newsList: Game[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }, null>>(`/games/public?page=${page}&pageSize=${pageSize}`);
  if (res.data.code !== "SUCCESS" || !res.data.data?.newsList) {
    throw new Error(res.data.message || "공개 게임 리스트 조회 실패");
  }
  return res.data.data.newsList;
}

/**
 * 공개 게임 상세 조회 API
 * ----------------------------------------------------------------------------
 * 인증/토큰 없이 공개된 게임 뉴스의 상세 정보를 조회합니다.
 *
 * @param {number} id - 게임 뉴스의 고유 id
 * @returns {Promise<Game>} - 상세 게임 뉴스 객체
 * @throws {Error} 조회 실패 시 에러 발생
 *
 * @example
 * const game = await fetchPublicGameDetail(123);
 */
export async function fetchPublicGameDetail(id: number): Promise<Game> {
  const res = await API.get<ResponseBuilder<{ news: Game }, null>>(`/games/public/${id}`);
  if (res.data.code !== "SUCCESS" || !res.data.data?.news) {
    throw new Error(res.data.message || "공개 게임 상세 조회 실패");
  }
  return res.data.data.news;
}