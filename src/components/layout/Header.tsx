import { useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/ui/ContactDialog";

function HamburgerIcon({ open, ...props }: { open: boolean; [x: string]: any }) {
  return (
    <button
      type="button"
      aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
      {...props}
      className={`
        flex items-center justify-center
        p-2 rounded-lg
        transition
        hover:bg-gray-100
        focus-visible:outline-dashed
        outline-2
        sm:hidden
        z-30
      `}
    >
      {open ? (
        // X 아이콘
        <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
          <line x1="7" y1="7" x2="21" y2="21" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
          <line x1="21" y1="7" x2="7" y2="21" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      ) : (
        // 햄버거 아이콘
        <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
          <rect x="5" y="8" width="18" height="2.5" rx="1" fill="#222"/>
          <rect x="5" y="13" width="18" height="2.5" rx="1" fill="#222"/>
          <rect x="5" y="18" width="18" height="2.5" rx="1" fill="#222"/>
        </svg>
      )}
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <header
      className={`
        sticky top-0 z-40
        bg-white/95 backdrop-blur
        border-b border-gray-200
        flex items-center justify-between
        px-3 sm:px-8
        py-2 sm:py-3
        shadow-sm
        transition-all
      `}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 focus-visible:outline-dashed py-1"
        aria-label="홈으로 이동"
      >
        <FaGamepad
          className="text-pink-600 text-2xl sm:text-3xl"
          style={{ filter: "drop-shadow(0px 1px 0px #fffbe6) drop-shadow(0 2px 6px #ffd6e0)" }}
        />
        <span className="font-extrabold text-lg sm:text-xl text-blue-700 tracking-tight select-none whitespace-nowrap">
          DragonIron Games
        </span>
      </Link>

      {/* Nav/Buttons : PC/Tablet용 */}
      <nav className="hidden sm:flex items-center gap-5">
        <Link
          to="/games"
          className="hover:text-pink-600 text-gray-700 font-semibold text-base px-2 py-1 rounded focus-visible:outline-dashed transition"
        >
          Games
        </Link>
        <Link
          to="/news"
          className="hover:text-pink-600 text-gray-700 font-semibold text-base px-2 py-1 rounded focus-visible:outline-dashed transition"
        >
          News
        </Link>
        <Button
          variant="outline"
          className="ml-2 rounded-xl border font-comic bg-gradient-to-r from-yellow-100 to-pink-100 text-black shadow px-4 py-2 text-base hover:bg-pink-50 transition"
          onClick={() => setContactOpen(true)}
        >
          Contact
        </Button>
      </nav>

      {/* Hamburger : 모바일 only */}
      <HamburgerIcon open={menuOpen} onClick={() => setMenuOpen(v => !v)} />

      {/* 모바일 오버레이 메뉴 */}
      {menuOpen && (
        <div
          className={`
            fixed inset-0 z-40 bg-black/30
            flex flex-col
            sm:hidden
          `}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className={`
              bg-white rounded-b-2xl shadow-xl
              mx-3 mt-2
              p-6 pt-4 pb-8
              flex flex-col gap-4
              border border-gray-200
              max-w-xs
              w-[90%]
              relative
              z-50
              animate-fade-in
            `}
            style={{ alignSelf: "flex-end" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 p-2"
              aria-label="메뉴 닫기"
              onClick={() => setMenuOpen(false)}
            >
              <svg width={24} height={24} viewBox="0 0 28 28" fill="none">
                <line x1="7" y1="7" x2="21" y2="21" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
                <line x1="21" y1="7" x2="7" y2="21" stroke="#222" strokeWidth={2.5} strokeLinecap="round" />
              </svg>
            </button>
            <Link
              to="/games"
              className="block font-semibold text-lg py-2 px-2 rounded hover:bg-pink-50 focus-visible:outline-dashed transition"
              onClick={() => setMenuOpen(false)}
            >
              Games
            </Link>
            <Link
              to="/news"
              className="block font-semibold text-lg py-2 px-2 rounded hover:bg-pink-50 focus-visible:outline-dashed transition"
              onClick={() => setMenuOpen(false)}
            >
              News
            </Link>
            <Button
              variant="outline"
              className="rounded-xl border font-comic bg-gradient-to-r from-yellow-100 to-pink-100 text-black shadow px-4 py-2 text-base mt-2"
              style={{ width: "100%" }}
              onClick={() => { setMenuOpen(false); setContactOpen(true); }}
            >
              Contact
            </Button>
          </nav>
        </div>
      )}

      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}