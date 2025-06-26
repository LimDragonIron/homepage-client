import { useState } from "react";
import { createContact } from "@/api/contact";

/**
 * ContactDialog
 * ----------------------------------------------------------------------------
 * 사용자 문의(피드백, 질문 등)를 입력받아 서버로 전송하는 모달 다이얼로그 컴포넌트입니다.
 * - open이 true일 때만 렌더링됩니다.
 * - 문의 성공 시 안내 메시지를 표시합니다.
 * - 입력값 검증, 로딩, 에러 처리 지원.
 *
 * @param {object} props
 * @param {boolean} props.open - 다이얼로그 열림 여부
 * @param {() => void} props.onClose - 닫기/취소 시 호출되는 콜백
 *
 * @example
 * <ContactDialog open={isOpen} onClose={() => setIsOpen(false)} />
 */
export function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createContact({ title, content, email });
      setSuccess(true);
      setTitle(""); setContent(""); setEmail("");
    } catch (e: any) {
      setError(e.message ?? "문의 등록 실패");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSuccess(false);
    setError(null);
    setTitle(""); setContent(""); setEmail("");
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClose}
      style={{ minHeight: "100vh" }}
    >
      <div
        className="bg-white text-black rounded-xl shadow-2xl p-6 w-full max-w-sm relative border border-gray-200"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black focus:outline-none"
          onClick={handleClose}
          aria-label="닫기"
        >
          <svg width={24} height={24}><line x1="5" y1="5" x2="19" y2="19" stroke="#111" strokeWidth={2}/><line x1="19" y1="5" x2="5" y2="19" stroke="#111" strokeWidth={2}/></svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-black text-center">문의하기</h2>
        {success ? (
          <div className="text-green-700 text-center py-8">
            문의가 성공적으로 접수되었습니다.<br />빠른 시일 내에 답변드리겠습니다.
            <button
              className="mt-6 px-4 py-2 bg-black text-white rounded-lg w-full hover:bg-gray-800 transition"
              onClick={handleClose}
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-black">제목</span>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-base outline-none focus:border-black transition"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                minLength={2}
                maxLength={60}
                placeholder="문의 제목"
                autoFocus
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-black">이메일</span>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-base outline-none focus:border-black transition"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                maxLength={80}
                placeholder="your@email.com"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-black">내용</span>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 text-base outline-none focus:border-black transition min-h-[80px] resize-vertical"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                minLength={5}
                maxLength={500}
                placeholder="문의 내용을 입력하세요"
              />
            </label>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 mt-2 rounded-lg font-bold bg-black text-white hover:bg-gray-800 transition text-base"
              disabled={loading}
            >
              {loading ? "전송 중..." : "문의 보내기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}