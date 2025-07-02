import React, { forwardRef, useEffect, useState } from "react";
import { fetchActiveHeroes } from "@/api/heroes";
import type { Hero } from "@/types";

type MediaType = { type: "image" | "video"; url: string } | null;

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

const HeroSection = forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>((props, ref) => {
  const [media, setMedia] = useState<MediaType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const bp = useBreakpoint();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchActiveHeroes()
      .then((heroes: Hero[]) => {
        if (!mounted || !Array.isArray(heroes) || heroes.length === 0) {
          setMedia(null);
          return;
        }
        const hero = heroes[Math.floor(Math.random() * heroes.length)];
        if (hero.files && hero.files.length > 0) {
          const img = hero.files.find(f => f.type === "image");
          const vid = hero.files.find(f => f.type === "video");
          if (vid) setMedia({ type: "video", url: vid.url });
          else if (img) setMedia({ type: "image", url: img.url });
          else setMedia({ type: "image", url: hero.files[0].url });
        } else {
          setMedia(null);
        }
      })
      .catch(() => setMedia(null))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  // 반응형 높이 조정
  const minH = bp === "mobile" ? "40vh" : bp === "tablet" ? "55vh" : "70vh";

  return (
    <section
      ref={ref}
      {...props}
      className={`
        w-full
        min-h-[${minH}]
        flex items-center justify-center relative overflow-hidden
      `}
      style={{
        minHeight: minH,
        ...props.style
      }}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
          <span className="text-white text-lg">로딩 중...</span>
        </div>
      ) : media ? (
        media.type === "video" ? (
          <video
            src={media.url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        ) : (
          <img
            src={media.url}
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        )
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-0">
          <span className="text-gray-400 text-2xl">활성화된 히어로 없음</span>
        </div>
      )}
    </section>
  );
});

export default HeroSection;