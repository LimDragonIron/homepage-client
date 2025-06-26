import axios from "axios";

/**
 * Axios API Instance
 * ----------------------------------------------------------------------------
 * - API: 메인 axios 인스턴스. 모든 API 요청에 사용됩니다.
 * - 환경변수(VITE_API_URL)로 baseURL을 지정합니다.
 * - withCredentials: true로 모든 요청에 쿠키/세션 정보를 포함합니다.
 * - Content-Type을 기본적으로 application/json으로 지정합니다.
 *
 * @example
 * import API from "@/api/axiosInstance";
 * API.get("/endpoint").then(...);
 *
 * @remarks
 * 공통적으로 사용하는 axios 인스턴스를 export 합니다.
 * 인증/토큰 인터셉터가 필요한 경우 별도 파일(예: axiosInstance.ts)에서 추가 구현이 필요합니다.
 */

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

export default API;