import Container from "@/components/Container";
import { ToolCase } from "lucide-react";
import { useTranslations } from "next-intl";
import { Service } from "./Service";

export const Services = () => {
  const servicesTrans = useTranslations("home.services");
  return (
    <section className="sm:my-28 mt-10" id="services">
      <Container>
        <header className="mb-5">
          <h2 className="font-bold text-4xl mb-1">{servicesTrans("title")}</h2>
          <p className="font-normal text-lg text-subtitle-color">
            {servicesTrans("caption")}
          </p>
        </header>
        <div className="flex flex-wrap gap-6">
          {Array.from({ length: 8 }).map((_, index) => {
            return (
              <Service
                placeholder="/home/services/service-1.png"
                key={index}
                icon={<ToolCase width={40} />}
                index={index + 1}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};
