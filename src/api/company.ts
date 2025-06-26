import API from "./axiosInstance";
import type { ResponseBuilder, Company } from "@/types";

/**
 * 회사 정보 조회 (공개용)
 * @returns {Promise<Company>}
 */
export async function fetchCompany(): Promise<Company> {
  const res = await API.get<ResponseBuilder<{ company: Company }, null>>("/company");
  if (res.data.code !== "SUCCESS" || !res.data.data?.company) {
    throw new Error(res.data.message || "회사 정보 조회 실패");
  }
  return res.data.data.company;
}