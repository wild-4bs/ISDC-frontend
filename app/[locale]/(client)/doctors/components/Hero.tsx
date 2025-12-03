import Container from "@/components/Container";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const doctorsTrans = useTranslations("doctors");
  return (
    <section
      className="h-[50vh] overflow-hidden relative flex items-center justify-center"
      style={{ background: "linear-gradient(to right, #2553B4, #1F3E90)" }}
    >
      <Container className="text-center flex flex-col items-center justify-center text-white">
        <div className="title relative z-10">
          <h1 className="mb-2 font-bold text-4xl">
            {doctorsTrans("hero.title")}
          </h1>
          <p>{doctorsTrans("hero.caption")}</p>
        </div>
        <div className="ball z-0 size-[150px] absolute -top-12 -left-12 bg-[#4174e37c]"></div>
        <div className="ball z-0 size-[300px] absolute -bottom-24 right-24 bg-[#4174e37c]"></div>
        <ul className="flex items-center relative z-10 gap-4 mt-10 text-center [&_h2]:font-bold [&_h2]:text-xl">
          <li>
            <h2>+9</h2>
            <p>{doctorsTrans("modernTechs")}</p>
          </li>
          <li className="px-4 border-x border-x-input">
            <h2>+15</h2>
            <p>{doctorsTrans("yearsOfExp")}</p>
          </li>
          <li>
            <h2>+4</h2>
            <p>{doctorsTrans("specDoctors")}</p>
          </li>
        </ul>
      </Container>
    </section>
  );
};
