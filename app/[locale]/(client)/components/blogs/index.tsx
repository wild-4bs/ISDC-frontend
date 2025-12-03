import Container from "@/components/Container";
import { Blog } from "./Blog";
import { useTranslations } from "next-intl";

export const Blogs = () => {
  const blogsTrans = useTranslations("home.blogs");
  return (
    <section>
      <Container>
        <header className="mb-8 max-md:text-center">
          <h2 className="font-bold text-6xl max-md:text-4xl mb-3">
            {blogsTrans.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h2>
          <p className="font-medium text-xl max-md:text-lg">{blogsTrans("caption")}</p>
        </header>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
        </div>
      </Container>
    </section>
  );
};
