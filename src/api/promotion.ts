import API from "./axiosInstance";
import type { PromotionBanner, ResponseBuilder } from "@/types";

/**
 * 활성화된 프로모션 배너 리스트 조회 API
 * ----------------------------------------------------------------------------
 * isDraft: false, isActive: true 조건의 활성화된 프로모션 배너 목록을 조회합니다.
 * (인증/로그인 필요 없음)
 *
 * @returns {Promise<PromotionBanner[]>} - 활성화된 배너 목록
 * @throws {Error} 조회 실패 시 에러 발생
 *
 * @example
 * const banners = await fetchActivePromotions();
 */
export async function fetchActivePromotions(): Promise<PromotionBanner[]> {
  const res = await API.get<ResponseBuilder<{ banners: PromotionBanner[] }, null>>("/promotions/active");
  if (res.data.code !== "SUCCESS" || !res.data.data?.banners) {
    throw new Error(res.data.message || "활성화된 배너 조회 실패");
  }
  return res.data.data.banners;
}