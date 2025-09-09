"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timeline = gsap.timeline();

    // Animasi teks
    timeline.fromTo(
      ".preloader-text",
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.5 }
    );

    // Tahan sebentar
    timeline.to({}, { duration: 1 });

    // Fade out preloader
    timeline.to(".preloader", {
      opacity: 0,
      scale: 1.1,
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: onComplete,
    });
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="preloader overflow-x-hidden fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#111111] text-white z-50">
      <div className="text-center">
        <h3 className="preloader-text tracking-[3px] font-Comfortaa text-[20px] opacity-0">
          The Wedding of
        </h3>
        <h1 className="preloader-text lg:text-[80px] text-[40px] font-WindSong opacity-0">
          Dewa & Sylvana
        </h1>
        <p className="preloader-text text-[16px] font-Comfortaa tracking-[3px] opacity-0">
          2 November 2025
        </p>
      </div>
    </div>
  );
}
