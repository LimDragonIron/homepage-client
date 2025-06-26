import React, { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchActivePromotions } from "@/api";
import type { PromotionBanner } from "@/types";

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

const PROMOTION_SLIDE_INTERVAL = 10000;

const PromotionSection = forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>((props, ref) => {
  const [promotions, setPromotions] = useState<PromotionBanner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const bp = useBreakpoint();

  useEffect(() => {
    fetchActivePromotions()
      .then(banners => setPromotions(banners))
      .catch(() => setPromotions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (promotions.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length);
    }, PROMOTION_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [promotions]);

  if (loading) {
    return null;
  }
  if (!promotions.length) {
    return null;
  }

  const promotion = promotions[current];
  const files = promotion.files?.length ? promotion.files : [{ url: "https://placehold.co/800x400?text=No+Image" }];
  const imageUrl = files[0].url;

  // 반응형 이미지 높이
  const imgH = bp === "mobile" ? 120 : bp === "tablet" ? 180 : 260;

  return (
    <section
      ref={ref}
      {...props}
      className="w-full min-h-[180px] sm:min-h-[220px] md:min-h-[300px] lg:min-h-[360px] py-6 md:py-12 relative flex flex-col items-center justify-center"
      style={{ ...props.style }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={promotion.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="w-full flex flex-col items-center"
            >
              <img
                src={imageUrl}
                alt={promotion.title}
                className="rounded-lg w-full"
                style={{
                  height: imgH,
                  objectFit: "cover",
                  background: "#f6f1e7",
                  border: "1px solid #e6dcc2"
                }}
              />
              <div className="text-base sm:text-lg md:text-xl font-bold text-[#a47e3b] mt-3 font-serif text-center">
                {promotion.title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

export default PromotionSection;