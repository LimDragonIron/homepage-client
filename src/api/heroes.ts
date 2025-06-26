import API from "./axiosInstance";
import type { ResponseBuilder, Hero } from "@/types";

/**
 * 활성화된 히어로 리스트 조회 API
 * ----------------------------------------------------------------------------
 * isDraft: false, isActive: true 조건의 활성화된 히어로만 조회합니다.
 * (일반 사용자/비회원도 접근 가능)
 *
 * @returns {Promise<Hero[]>} - 활성화된 히어로 목록
 * @throws {Error} 조회 실패 시 에러 발생
 *
 * @example
 * const heroes = await fetchActiveHeroes();
 */
export async function fetchActiveHeroes(): Promise<Hero[]> {
  const res = await API.get<ResponseBuilder<{ heroes: Hero[] }, null>>("/heroes/active");
  if (res.data.code !== "SUCCESS" || !res.data.data?.heroes) {
    throw new Error(res.data.message || "활성화된 히어로 조회 실패");
  }
  return res.data.data.heroes;
}