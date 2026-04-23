import Container from "@/components/Container";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const homeTrans = useTranslations("home");
  return (
    <section className="h-hero-height relative w-full mb-20">
      <video
        poster="/home/hero/placeholder.webp"
        preload="none"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/home/hero/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-black/60 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 w-full h-64 bg-linear-to-t from-black/70 to-transparent z-10" />

      <Container className="h-full">
        <div className="h-full flex flex-col justify-center items-center text-white relative z-20">
          <h1 className="text-6xl font-bold leading-[120%] mb-4.5 text-center">
            {homeTrans("hero.title")}
          </h1>
          <p className="text-xl font-medium text-center w-full max-w-4xl">
            {homeTrans("hero.subtitle")}
          </p>
        </div>
      </Container>
    </section>
  );
};
