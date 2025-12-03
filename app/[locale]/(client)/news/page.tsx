import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Blog } from "./components/Blog";
import { useTranslations } from "next-intl";

export default function page() {
  const blogsTrans = useTranslations("blogs")
  return (
    <main>
      <Container>
        <header className="pt-14 pb-4">
          <h1 className="font-bold text-2xl mb-2">{blogsTrans("title")}</h1>
          <Input placeholder={blogsTrans("inputs.search.placeholder")} />
        </header>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5">
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
          <Blog />
        </div>
      </Container>
    </main>
  );
}
