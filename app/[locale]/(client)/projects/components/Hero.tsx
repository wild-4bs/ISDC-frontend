import Container from "@/components/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Hero = () => {
  const projectsTrans = useTranslations("projects.hero");
  return (
    <section className="relative">
      <Container className="text-center h-[60vh] min-h-[400px]">
        <Image
          src={"/projects/hero.png"}
          width={1000}
          height={1000}
          alt="hero-image"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="relative text-center z-10 text-white flex flex-col items-center justify-center h-full">
          <h1
            className="font-bold text-6xl max-sm:text-4xl leading-[108%] mb-1"
            dangerouslySetInnerHTML={{ __html: projectsTrans("title") }}
          ></h1>
          <p className="text-2xl max-sm:text-xl">{projectsTrans("caption")}</p>
        </div>
      </Container>
    </section>
  );
};
