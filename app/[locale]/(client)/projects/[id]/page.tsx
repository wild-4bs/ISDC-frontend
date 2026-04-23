"use client";

import Container from "@/components/Container";
import { useGetProjectById } from "@/features/projects/api/projects.hook";
import { useParams } from "next/navigation";
import { Project } from "./components/Project";
import { RelatedProjects } from "./components/RelatedProjects";

type JsonViewerProps = { data: unknown };

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => (
  <pre
    style={{
      background: "var(--background)",
      color: "var(--foreground)",
      padding: "16px",
      borderRadius: "12px",
      overflowX: "auto",
      fontSize: "14px",
      lineHeight: "1.5",
      border: "1px solid var(--input-border)",
    }}
  >
    <code>{JSON.stringify(data, null, 2)}</code>
  </pre>
);

export default function Page() {
  const { id }: { id: string } = useParams();

  const { data: project, isFetching } = useGetProjectById(id);

  return (
    <main>
      <Container className="min-h-[20vh] pt-12 max-md:pt-8">
        <Project project={project?.payload} isLoading={isFetching} />
      </Container>
      <Container className="mb-12">
        <RelatedProjects excludeId={id} />
      </Container>
    </main>
  );
}
