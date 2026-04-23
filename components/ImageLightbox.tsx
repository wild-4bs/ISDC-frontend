"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const ImageLightbox = ({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (!contentRef.current?.contains(e.target as Node)) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="relative max-w-4xl w-full mx-4 aspect-square"
      >
        <Image
          src={src}
          fill
          unoptimized
          className="object-contain"
          alt="clinical-image-fullscreen"
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
      >
        <XIcon size={20} />
      </button>
    </div>
  );
};
