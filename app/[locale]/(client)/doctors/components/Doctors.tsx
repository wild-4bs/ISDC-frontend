import Container from "@/components/Container";
import { Doctor } from "./Doctor";
import { useTranslations } from "next-intl";

export const Doctors = () => {
  const doctorsTrans = useTranslations("doctors.about");
  return (
    <section className="my-18">
      <Container className="text-center">
        <header className="mb-10">
          <h2 className="font-bold text-3xl">{doctorsTrans("title")}</h2>
          <p>{doctorsTrans("caption")}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Doctor />
          <Doctor />
          <Doctor />
          <Doctor />
          <Doctor />
          <Doctor />
        </div>
      </Container>
    </section>
  );
};
