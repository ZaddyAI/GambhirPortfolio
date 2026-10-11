"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/constants";

const STORAGE_KEY = "has_site_loaded";
const TOTAL_BARS = 22;

const QUOTES = [
  {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "Perfection is achieved when there is nothing left to take away.",
    author: "Antoine de Saint-Exupéry",
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
  },
];

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

/**
 * Animated Fullscreen Starfield Canvas:
 * Moving stars drifting across space with occasional shooting stars.
 */
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize stars drifting across the whole screen
    const STAR_COUNT = 150;
    const palette = ["#aaccd8", "#7dd3fc", "#e0f2fe", "#ffffff", "#cbd5e1"];
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.2) * 0.3 + 0.15, // gentle drift
      speedY: -(Math.random() * 0.35 + 0.2),
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      twinklePhase: Math.random() * Math.PI * 2,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    const shootingStars: ShootingStar[] = [];
    let lastShootTime = performance.now();

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Render & update moving stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;
        star.twinklePhase += star.twinkleSpeed;

        // Wrap edges smoothly across entire screen
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        const currentAlpha = Math.max(
          0.15,
          Math.min(1, star.alpha + Math.sin(star.twinklePhase) * 0.35)
        );

        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        if (star.size > 1.3) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = star.color;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Shooting stars streaking diagonally across the screen
      if (now - lastShootTime > 1200 && Math.random() < 0.6) {
        lastShootTime = now;
        shootingStars.push({
          x: Math.random() * width * 0.85 + width * 0.05,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 85 + 75,
          speed: Math.random() * 6 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          opacity: 1,
          life: 0,
          maxLife: 26,
        });
      }

      // Render & update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity = 1 - s.life / s.maxLife;

        if (s.life >= s.maxLife || s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.opacity * 0.9;
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, "rgba(170, 204, 216, 0)");
        gradient.addColorStop(0.65, "rgba(170, 204, 216, 0.45)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 1)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#aaccd8";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

/**
 * Opening Splash: Clean minimalist screen with moving stars across the whole background,
 * central logo, and tilted loading bars only (no text, no extra components).
 */
export default function Splash() {
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Storage restricted fallback
    }
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
    }, 450);
  }, []);

  useEffect(() => {
    // Only show splash on the homepage ("/")
    if (pathname !== "/" && pathname !== "") {
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Storage restricted fallback
      }
      return;
    }

    // Skip on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Check if session has already seen the splash
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceSplash = urlParams.has("splash");
      if (!forceSplash && sessionStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // Storage restricted fallback
    }

    setShouldRender(true);
    setProgress(0);
    setIsExiting(false);

    // Smooth progress simulation (approx 3.8s progress + 300ms hold + 450ms fade = ~4.5s total visible)
    let current = 0;
    const interval = setInterval(() => {
      let increment: number;
      if (current < 30) {
        increment = Math.random() * 0.4 + 0.8;
      } else if (current < 70) {
        increment = Math.random() * 0.35 + 0.85;
      } else if (current < 90) {
        increment = Math.random() * 0.4 + 0.8;
      } else {
        increment = Math.random() * 0.5 + 0.95;
      }

      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          dismiss();
        }, 300);
      }
    }, 36);

    // Hard fallback timeout ensures unmount even if interrupted
    const fallbackTimer = setTimeout(() => {
      dismiss();
    }, 5500);

    // Key listener for skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname, dismiss]);

  if (!shouldRender) return null;

  const activeBars = Math.round((progress / 100) * TOTAL_BARS);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#070709] select-none cursor-default transition-all duration-500 ease-out ${isExiting
        ? "opacity-0 scale-[1.02] filter blur-[4px] pointer-events-none"
        : "opacity-100 scale-100"
        }`}
    >
      {/* Stars in Whole Screen Background */}
      <Starfield />

      {/* Centered: Logo and Tilted Loading Bar Only */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Image
          src={site.logoInvert}
          alt=""
          width={84}
          height={84}
          priority
          className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-[0_0_24px_rgba(170,204,216,0.45)]"
        />

        {/* Loading text, progress percentage, and Tilted Loading Bar */}
        <div className="mt-8 sm:mt-10 flex flex-col items-stretch gap-2.5">
          {/* Loading text & Progress Percentage */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono tracking-widest px-0.5">
            <span className="text-zinc-400 uppercase flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#aaccd8] animate-pulse" />
              Loading...
            </span>
            <span className="font-semibold text-[#aaccd8] tabular-nums drop-shadow-[0_0_6px_rgba(170,204,216,0.6)]">
              {Math.min(100, Math.floor(progress))}%
            </span>
          </div>

          {/* Tilted Loading Bar */}
          <div className="flex items-center justify-between gap-1 sm:gap-1.5">
            {Array.from({ length: TOTAL_BARS }).map((_, i) => {
              const isActive = i < activeBars;
              const isLead = i === activeBars - 1 && progress < 100;
              return (
                <div
                  key={i}
                  className={`tilted-bar h-4 sm:h-5 w-1.5 sm:w-2 transition-all duration-100 ${isLead
                    ? "bg-white shadow-[0_0_12px_rgba(255,255,255,1),0_0_20px_rgba(170,204,216,0.95)] z-10"
                    : isActive
                      ? "bg-gradient-to-t from-[#5a8698] via-[#aaccd8] to-[#e6f4f8] shadow-[0_0_8px_rgba(170,204,216,0.7)]"
                      : "bg-white/[0.05] border border-white/[0.08]"
                    }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Quote */}
      <div className="absolute bottom-7 sm:bottom-10 left-0 right-0 px-6 text-center pointer-events-none z-10 flex flex-col items-center">
        <p className="max-w-md sm:max-w-lg text-xs sm:text-sm font-light italic leading-relaxed text-zinc-400">
          &ldquo;{quote.text}&rdquo;
        </p>
        <span className="mt-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#aaccd8]/70">
          — {quote.author}
        </span>
      </div>
    </div>
  );
}
