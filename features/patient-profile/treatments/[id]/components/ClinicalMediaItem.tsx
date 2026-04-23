// components/ClinicalMediaItem.tsx
"use client";
import { API_URL } from "@/lib/axios";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  id: string;
  url: string;
  filename: string;
  onSelect: (url: string) => void;
};

export const ClinicalMediaItem = ({ id, url, filename, onSelect }: Props) => {
  return (
    <div className="relative w-full h-[140px] overflow-hidden rounded-md group">
      <div
        className={clsx("w-full h-full cursor-pointer", {})}
        onClick={() => onSelect(url)}
      >
        <Image
          src={`${API_URL}${url}`}
          fill
          className={`object-cover transition-transform duration-200 group-hover:scale-105`}
          alt={filename}
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      </div>
    </div>
  );
};
