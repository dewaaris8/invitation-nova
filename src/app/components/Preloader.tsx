"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isClient, setIsClient] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timeline = gsap.timeline();

    // Show text animation
    timeline.fromTo(
      ".preloader-text",
      { opacity: 0, y: 30, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.5 }
    );

    // Pause briefly before showing the image
    timeline.to({}, { duration: 0.5 });

    // Show image animation
    timeline.to(".preloader-image", {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
      onStart: () => setShowImage(true),
    });

    // Hold the image for a moment
    timeline.to({}, { duration: 1 });

    // Fade out and remove the preloader
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
    <div className="preloader fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#111111] text-white z-50">
      {!showImage && (
        <div className="text-center">
          <h3 className="preloader-text tracking-[3px] font-Comfortaa text-[20px] opacity-0">
            The Wedding of
          </h3>
          <h1 className="preloader-text lg:text-[80px] text-[40px] font-WindSong opacity-0">
            Nova & Silvi
          </h1>
          <p className="preloader-text text-[16px] font-Comfortaa tracking-[3px] opacity-0">
            Monday, 10 September 2025
          </p>
        </div>
      )}

      {showImage && (
        <div className="preloader-image opacity-0 scale-90">
          <Image
            src="/images/4.jpg"
            alt="Wedding Couple"
            width={400}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            priority
          />
        </div>
      )}
    </div>
  );
}
