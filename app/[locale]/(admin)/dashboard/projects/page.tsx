import { ProjectsFeature } from "@/features/projects/components/ProjectsFeature";
import { DialogProvider } from "@/providers/dialog";

export default function page() {
  return (
    <DialogProvider>
      <ProjectsFeature />
    </DialogProvider>
  );
}
