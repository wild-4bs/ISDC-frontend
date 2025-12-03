import Container from "@/components/Container";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Hero = () => {
  const homeTrans = useTranslations("home");
  return (
    <section className="h-[calc(100vh-150px)] relative w-full">
      <Image
        src={"/home/hero.png"}
        width={1000}
        height={1000}
        alt="hero-image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <Container className="h-full">
        <div className="h-full flex flex-col justify-center items-center text-white relative z-10">
          <h1 className="text-6xl font-bold leading-[120%] mb-4.5 text-center">{homeTrans("hero.title")}</h1>
          <p className="text-xl font-medium text-center w-full max-w-4xl">{homeTrans("hero.subtitle")}</p>
        </div>
      </Container>
    </section>
  );
};
