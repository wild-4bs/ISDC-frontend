import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project } from "@/features/projects";
import { API_URL } from "@/lib/axios";
import { useDialog } from "@/providers/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { projectKeys, useDeleteProject } from "../../api/projects.hook";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const deleteProject = useDeleteProject();
  const queryClient = useQueryClient();
  const { openDialog } = useDialog();

  const handleDelete = () => {
    deleteProject.mutate(project.id, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({
          queryKey: projectKeys.infinite(),
        });
        toast.success(res?.message);
      },
    });
  };
  return (
    <Card className="p-0 overflow-hidden gap-0">
      <CardHeader className="p-0">
        <BeforeAfterSlider
          imageBefore={`${API_URL}${project.imageBefore}`}
          imageAfter={`${API_URL}${project.imageAfter}`}
        />
      </CardHeader>
      <CardContent className="p-0 m-0 rounded-none shadow-none border-none">
        <div className="border-b-input border-b p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="soft" theme="primary" size="sm">
                {project.category}
              </Badge>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  className="text-foreground"
                >
                  <MoreVertical />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="flex flex-col gap-1 w-[150px]"
              >
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="justify-start text-foreground"
                  onClick={() => openDialog("edit-project", { project })}
                >
                  <Pencil /> تعديل
                </Button>
                <Button
                  variant={"ghost"}
                  theme={"danger"}
                  size={"sm"}
                  className="justify-start"
                  disabled={deleteProject.isPending}
                  onClick={handleDelete}
                >
                  <Trash /> حذف
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <h2 className="font-medium text-base leading-[150%]">
            {project.title}
          </h2>
          {project.description && (
            <p className="text-sm leading-tight text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
