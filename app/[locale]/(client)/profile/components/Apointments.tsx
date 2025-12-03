import Container from "@/components/Container";
import { Calendar, Eye } from "lucide-react";
import { Appointment } from "./Appointment";
import { useTranslations } from "next-intl";

export const Appointments = () => {
  const profileTrans = useTranslations("profile.appointments");
  return (
    <section className="p-12 bg-primary/10">
      <Container className="p-6 rounded-2xl border border-input shadow-xs bg-white">
        <header className="flex justify-between pb-2 border-b border-b-input max-md:flex-col max-md:justify-start max-md:gap-2">
          <h2 className="flex items-center gap-2">
            <Calendar className="text-primary" width={24} />{" "}
            {profileTrans("title")}
          </h2>
          <div className="flex gap-2 max-md:items-center max-md:self-end">
            <div className="flex flex-col text-end">
              <span className="font-bold text-xl leading-5">8</span>
              <span className="font-medium text-sm text-subtitle-color max-md:hidden">
                {profileTrans("total")}
              </span>
            </div>
            <div className="size-10 flex items-center justify-center rounded-md bg-primary text-white">
              <Eye />
            </div>
          </div>
        </header>
        <div className="flex flex-col gap-4 mt-5">
          <Appointment />
        </div>
      </Container>
    </section>
  );
};
