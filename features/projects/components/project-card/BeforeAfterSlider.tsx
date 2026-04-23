"use client";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

function PlaceholderBefore() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="4" fill="#B5D4F4" />
      <rect x="12" y="28" width="56" height="32" rx="3" fill="#85B7EB" />
      <circle cx="28" cy="22" r="8" fill="#85B7EB" />
      <rect x="44" y="16" width="24" height="10" rx="2" fill="#85B7EB" />
    </svg>
  );
}

function PlaceholderAfter() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <rect width="80" height="80" rx="4" fill="#5DCAA5" />
      <rect x="8" y="24" width="64" height="36" rx="4" fill="#1D9E75" />
      <circle cx="40" cy="18" r="10" fill="#1D9E75" />
      <rect x="24" y="38" width="32" height="6" rx="2" fill="#9FE1CB" />
      <rect x="28" y="48" width="24" height="4" rx="2" fill="#9FE1CB" />
    </svg>
  );
}

function ErrorPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 gap-2">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="6" fill="#E2E8F0" />
        <path d="M10 28l6-8 4 5 3-4 7 7H10z" fill="#94A3B8" />
        <circle cx="26" cy="14" r="4" fill="#94A3B8" />
        <line
          x1="6"
          y1="6"
          x2="34"
          y2="34"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xs text-gray-400">Failed to load</span>
    </div>
  );
}

function SliderImage({
  src,
  alt,
  fallback,
}: {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
}) {
  const [errored, setErrored] = useState(false);

  if (!src)
    return (
      <div className="w-full h-full flex items-center justify-center">
        {fallback}
      </div>
    );
  if (errored) return <ErrorPlaceholder />;
  return (
    <Image
      unoptimized
      src={src}
      alt={alt}
      fill
      className="object-cover pointer-events-none"
      onError={() => setErrored(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    />
  );
}

export const BeforeAfterSlider = ({
  imageBefore,
  imageAfter,
}: {
  imageBefore?: string;
  imageAfter?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingX = useRef<number | null>(null);

  // Write position directly to a CSS custom property — zero React re-renders during drag.
  const setPos = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - left) / width) * 100));
    el.style.setProperty("--pos", `${pct.toFixed(3)}%`);
  };

  // Throttle to one DOM write per animation frame.
  const onMove = (clientX: number) => {
    pendingX.current = clientX;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      if (pendingX.current !== null) setPos(pendingX.current);
      rafRef.current = null;
    });
  };

  const startDrag = (clientX: number) => {
    setPos(clientX);

    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const stopDrag = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[220px] w-full overflow-hidden rounded-t-xl cursor-col-resize select-none"
      // CSS custom property drives clip-path, divider, and handle — no state involved.
      style={{ "--pos": "50%" } as React.CSSProperties}
      onMouseDown={(e) => {
        e.preventDefault();
        startDrag(e.clientX);
      }}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
    >
      {/* Before layer — always fully visible underneath */}
      <div className="absolute inset-0 bg-blue-200 flex items-center justify-center">
        <SliderImage
          src={imageBefore}
          alt="قبل"
          fallback={<PlaceholderBefore />}
        />
      </div>

      {/*
        After layer — clip-path reads --pos directly from the CSS cascade.
        will-change promotes this element to its own compositor layer so
        clip-path updates skip layout and paint entirely.
      */}
      <div
        className="absolute inset-0 bg-teal-200 flex items-center justify-center"
        style={{
          clipPath: "inset(0 calc(100% - var(--pos)) 0 0)",
          willChange: "clip-path",
        }}
      >
        <SliderImage
          src={imageAfter}
          alt="بعد"
          fallback={<PlaceholderAfter />}
        />
      </div>

      {/* Divider line — left tracks --pos via inline style */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
        style={{
          left: "var(--pos)",
          transform: "translateX(-50%)",
          willChange: "left",
        }}
      />

      {/* Handle — left tracks --pos via inline style */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center pointer-events-none"
        style={{
          left: "var(--pos)",
          willChange: "left",
        }}
      >
        <ArrowLeftRight size={16} />
      </div>

      <span className="absolute bottom-2.5 right-2.5 text-[11px] font-medium px-2 py-0.5 rounded bg-black/45 text-white pointer-events-none">
        قبل
      </span>
      <span className="absolute bottom-2.5 left-2.5 text-[11px] font-medium px-2 py-0.5 rounded bg-black/45 text-white pointer-events-none">
        بعد
      </span>
    </div>
  );
};
