"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const GALLERY_IMAGES = [
  "/bub1.jpeg",
  "/bub2.jpeg",
  "/bub3.jpeg",
  "/bub4.jpeg",
  "/bub5.jpeg",
  "/bub6.jpeg",
  "/bub7.jpeg",
  "/bub8.jpeg",
  "/bub9.jpeg",
  "/bub10.jpeg",
];

export const Gallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollToCenter = () => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    };
    scrollToCenter();
    const ro = new ResizeObserver(scrollToCenter);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="bg-white flex flex-col items-center font-jakarta w-full py-16">
      <div className="text-center mb-12">
        <h3 className="font-semibold text-2xl lg:text-[40px] mb-4 text-black">
          See the Sparkle
        </h3>
        <p className="font-work font-medium text-lg lg:text-2xl text-[#383838]">
          Take a look at some of our recent favorite transformations across different spaces.
        </p>
      </div>
      <div ref={scrollRef} className="w-full overflow-x-auto overflow-y-hidden pb-4">
        <div
          className="inline-grid gap-4"
          style={{
            gridTemplateRows: "repeat(2, 1fr)",
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(380px, 400px)",
          }}
        >
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative aspect-4/3 rounded-xl overflow-hidden shrink-0 "
            >
              <Image
                src={src}
                alt={`Transformation ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 320px"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};