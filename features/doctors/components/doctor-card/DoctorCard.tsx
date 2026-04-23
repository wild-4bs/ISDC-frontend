"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDialog } from "@/providers/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pencil, Stethoscope, Trash2, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { doctorKeys, useDeleteDoctor } from "../../api/doctors.hook";
import { Doctor } from "../../types/index.types";
import { API_URL } from "@/lib/axios";

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [pendingState, setPendingState] = useState({
    isDeleting: false,
  });
  const { openDialog } = useDialog();
  const deleteDoctor = useDeleteDoctor();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    setPendingState((prev) => ({ ...prev, isDeleting: true }));
    deleteDoctor.mutate(doctor.id, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: doctorKeys.infinite(),
        });
        toast.success(res?.message);
        setPendingState((prev) => ({ ...prev, isDeleting: false }));
        await queryClient.invalidateQueries({ queryKey: ["statistics"] });
        await queryClient.invalidateQueries({ queryKey: ["timeline"] });
      },
      onError: () => {
        setPendingState((prev) => ({ ...prev, isDeleting: false }));
      },
    });
  };
  return (
    <Card className="overflow-hidden p-0 hover:border-primary/40 transition-all group">
      <CardContent className="p-0">
        <div className="relative w-full bg-muted overflow-hidden">
          {doctor.image ? (
            <Image
              src={`${API_URL}${doctor.image}`}
              alt={doctor.name}
              width={1000}
              height={220}
              className="w-full h-auto transition-transform duration-400 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
              <User size={48} />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  theme="secondary"
                  className="h-8 w-8 rounded-full shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4 text-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-32 p-1 flex flex-col gap-1"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2 font-normal text-sm text-foreground"
                  onClick={() => openDialog("edit-doctor", { doctor })}
                >
                  <Pencil className="h-3.5 w-3.5" /> تعديل
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={pendingState.isDeleting}
                  className="justify-start gap-2 font-normal text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" /> حذف
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground line-clamp-1">
            {doctor.name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
            <Stethoscope className="h-3.5 w-3.5 text-primary/70" />
            <span className="text-sm font-medium">{doctor.profession}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Container Component for Dashboard ---
