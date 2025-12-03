import Container from "@/components/Container";
import { Project } from "./Project";
import { useTranslations } from "next-intl";

export const Projects = () => {
  const projectsTrans = useTranslations("projects.projects");
  return (
    <section className="mt-16 mb-14">
      <Container>
        <header className="mb-5">
          <h2 className="mb-1 font-bold text-3xl">{projectsTrans("title")}</h2>
          <p>{projectsTrans("caption")}</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Project />
          <Project />
          <Project />
          <Project />
          <Project />
        </div>
      </Container>
    </section>
  );
};
