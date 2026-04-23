// components/ClinicalMediaItem.tsx
"use client";
import { treatmentKeys } from "@/features/patients/[id]/treatments";
import { API_URL } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Loader2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteClinicalMediaRecord } from "../api/clinical-media.hook";

type Props = {
  id: string;
  url: string;
  filename: string;
  treatmentId: string;
  onSelect: (url: string) => void;
};

export const ClinicalMediaItem = ({
  id,
  url,
  filename,
  onSelect,
  treatmentId,
}: Props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteMedia = useDeleteClinicalMediaRecord();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteMedia.mutate(id, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: treatmentKeys.byId(treatmentId),
        });
        setIsDeleted(true);
        toast.success(res?.message);
      },
    });
  };

  const isPending = deleteMedia.isPending;

  return (
    <div className="relative w-full h-[140px] overflow-hidden rounded-md group">
      <div
        className={clsx("w-full h-full", {
          "cursor-not-allowed": isPending || isDeleted,
          "cursor-pointer": !isPending && !isDeleted,
        })}
        onClick={() => !isPending && onSelect(url)}
      >
        <Image
          src={`${API_URL}${url}`}
          fill
          className={`object-cover transition-transform duration-200 ${isPending ? "opacity-40" : "group-hover:scale-105"}`}
          alt={filename}
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      </div>

      {isPending ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2Icon size={22} className="text-white animate-spin" />
        </div>
      ) : (
        <button
          onClick={handleDelete}
          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
        >
          <XIcon size={14} />
        </button>
      )}
    </div>
  );
};
