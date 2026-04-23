import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { Project as ProjectTYpe } from "@/features/projects";
import { BeforeAfterSlider } from "@/features/projects/components/project-card/BeforeAfterSlider";
import { API_URL } from "@/lib/axios";

interface ProjectHeaderProps {
  project?: ProjectTYpe;
  isLoading: boolean;
}

export function Project({ project, isLoading }: ProjectHeaderProps) {
  if (!project) return null;

  return (
    <>
      {isLoading ? (
        <header className="space-y-3">
          <Skeleton className="h-7 w-40 rounded-full" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </header>
      ) : (
        <header>
          <span className="px-6 py-1 border border-primary rounded-full bg-primary/10 text-primary mb-6 inline-block">
            {project.category}
          </span>
          <h1 className="font-bold text-4xl mb-1">{project.title}</h1>
          <p className="text-lg">{project.description}</p>
        </header>
      )}
      <div className="w-full relative flex justify-center mt-20 mb-16">
        <div className="w-full h-[70%] z-0 absolute top-2/4 -translate-y-2/4 start-0 bg-blue-100" />
        <Container className="h-full flex justify-center">
          <div className="max-w-4xl w-full relative z-10 border-2 border-primary/20 overflow-hidden rounded-xl">
            {isLoading ? (
              <Skeleton className="w-full h-full rounded-none" />
            ) : project ? (
              <BeforeAfterSlider
                imageBefore={`${API_URL}${project.imageBefore}`}
                imageAfter={`${API_URL}${project.imageAfter}`}
              />
            ) : null}
          </div>
        </Container>
      </div>
    </>
  );
}
