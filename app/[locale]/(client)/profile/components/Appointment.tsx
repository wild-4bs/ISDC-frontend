import DoctorIcon from "@/assets/icons/doctor.svg";
import ToothIcon from "@/assets/icons/profile-tooth.svg";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const Appointment = () => {
  const commonTrans = useTranslations("common");
  const profileTrans = useTranslations("profile.appointments");
  return (
    <article className="p-4 border border-input rounded-xl shadow-xs bg-primary/5 hover:bg-primary/10 duration-300">
      <header className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:justify-start max-sm:items-start max-sm:gap-2">
        <h3 className="text-primary font-bold text-lg">الاحد ,5 سبتمبر 2025</h3>
        <div className="flex items-center gap-2 max-md:flex-col max-md:items-start max-md:mb-4">
          <Link href={"/profile/appointments/id"} className="max-md:w-full">
            <Button size={"sm"} className="max-md:w-full">
              {profileTrans("appointmentDetails")}
            </Button>
          </Link>
          <span className="px-2 py-1 font-light text-sm rounded-full bg-primary/99 text-white border border-primary">
            10:00 {commonTrans("AM")}
          </span>
        </div>
      </header>
      <dl className="flex flex-col gap-2 text-sm mt-3 text-subtitle-color">
        <div className="flex items-center gap-2">
          <dt>
            <DoctorIcon />
          </dt>
          <dd>د. ساره احمد - طبيبة اسنان</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt>
            <ToothIcon />
          </dt>
          <dd>تنظيف الاسنان وازالة الجير</dd>
        </div>
      </dl>
    </article>
  );
};
