import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import floatingToy from "@/assets/anime.json";

const ScrollBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0); // ms, drives motion even when not scrolling

  // Track scroll position so the toy roughly follows you down the page
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Time-based animation loop so it moves even when not scrolling
  useEffect(() => {
    let frameId: number;
    let last = performance.now();

    const loop = (now: number) => {
      const delta = now - last;
      last = now;
      setTime((prev) => prev + delta);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Free-floating motion: combination of gentle scroll follow + sine waves
  const t = time / 1400; // slightly slower time scale (bigger divisor)

  const offsetY = scrollY * 0.05; // gentle follow so it stays roughly with you
  // Moderated amplitudes so it still explores the screen but a bit calmer
  const floatY = offsetY + Math.sin(t) * 90 + Math.cos(t * 0.7) * 60;

  // Bias X to the left by subtracting a constant, and slow waves a bit
  const floatX = -80 + Math.sin(t * 0.8) * 130 + Math.cos(t * 1.1) * 90;

  // Simple 2D rotation so it gently tilts while floating
  const rotateZ = Math.sin(t * 0.9) * 8; // slightly slower/smaller spin

  const baseTransform = `translate3d(${floatX}px, ${floatY}px, 0) rotate(${rotateZ}deg)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_40px_rgba(56,189,248,0.7)]"
        style={{ transform: baseTransform }}
      >
        <Lottie animationData={floatingToy} loop autoplay className="h-full w-full" />
      </div>
    </div>
  );
};

export default ScrollBackground;
