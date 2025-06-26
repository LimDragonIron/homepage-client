import API from "./axiosInstance";
import type { ResponseBuilder } from "@/types";

/**
 * 문의(Contact) 생성 API
 * ----------------------------------------------------------------------------
 * 클라이언트(사용자)가 문의를 등록할 때 사용하는 API입니다.
 *
 * @param {Object} payload - 문의 데이터
 * @param {string} payload.title - 문의 제목
 * @param {string} payload.content - 문의 내용
 * @param {string} payload.email - 문의자 이메일
 * @returns {Promise<any>} - 생성된 문의 데이터(서버 반환 contact 객체)
 * @throws {Error} 등록 실패 시 에러 발생
 *
 * @example
 * await createContact({ title: "문의", content: "내용", email: "user@email.com" });
 */
export async function createContact(payload: { title: string; content: string; email: string }) {
  const res = await API.post<ResponseBuilder<{ contact: any }, null>>("/contact", payload);
  if (res.data.code !== "SUCCESS") throw new Error(res.data.message || "문의 등록 실패");
  return res.data.data?.contact;
}