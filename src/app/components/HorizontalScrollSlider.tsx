"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// ✅ Hook agar aman di Next.js (SSR)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSlider = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textTopRef = useRef<HTMLDivElement | null>(null);

  const pictures = [
    "/images/Gallery 1.jpg",
    "/images/Gallery 2.jpg",
    "/images/Gallery 3.jpg",
    "/images/Gallery 4.jpg",
    "/images/Gallery 5.jpg",
    "/images/Gallery 6.jpg",
    "/images/Gallery 7.jpg",
    "/images/Gallery 8.jpg",
  ];

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const scrollContent = scrollRef.current;
    const textTop = textTopRef.current;

    if (!container || !scrollContent || !textTop) return;

    const totalWidth = scrollContent.scrollWidth - container.offsetWidth;
    const viewportHeight = window.innerHeight;

    // Set container height
    gsap.set(container, { height: `${viewportHeight + totalWidth * 0.2}px` });

    // Horizontal scroll
    gsap.to(scrollContent, {
      x: -totalWidth,
      ease: "power1.out",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth * 0.6}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Parallax text
    gsap.to(textTop, {
      x: -totalWidth * 0.4,
      ease: "power1.out",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth * 0.6}`,
        scrub: 1,
      },
    });

    // Refresh setelah gambar load supaya ukuran fix
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* 🔹 Teks Atas */}
      <div
        ref={textTopRef}
        className="absolute top-[60px] w-full text-center font-NotoSerif tracking-[3px] left-1/2 -translate-x-1/2 leading-10 text-white text-[28px] font-[400]"
      >
        Our Gallery <br />
        <span className="font-WindSong text-center text-white text-[40px] tracking-[0px]">
          <span className="text-[45px]">N</span>ova &{" "}
          <span className="text-[45px]">S</span>ilvi
        </span>
      </div>

      {/* 🔹 Slider */}
      <div className="sticky top-[50px] h-screen flex items-center overflow-hidden">
        <div ref={scrollRef} className="flex gap-8 px-10 w-max">
          {pictures.map((src, index) => (
            <div key={index} className="w-[400px] h-[550px] flex-shrink-0">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={400}
                height={500}
                className="w-full h-full object-cover"
                priority={index === 0} // ✅ load gambar pertama lebih cepat
              />
            </div>
          ))}
          <div className="absolute top-[580px] font-MeieScript tracking-[3px] left-1/2 -translate-x-1/2 text-white text-[20px] font-[400]">
            Cherished moments, beautiful memories—relive the magic of our
            special day through our gallery.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSlider;
