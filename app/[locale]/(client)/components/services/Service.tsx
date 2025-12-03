import { Layer } from "@/components/Layer";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  index: number;
  placeholder: string;
}

export const Service = ({ icon, index, placeholder }: Props) => {
  const servicesTrans = useTranslations("home.services");
  return (
    <Link href={"/services/id"} className="w-full md:min-w-md min-w-full flex-1">
      <article className="flex flex-col justify-between cursor-pointer select-none relative overflow-hidden px-4 py-9 duration-300 rounded-3xl bg-[#C6E3DE] w-full group hover:text-white">
        <div
          className="absolute top-0 left-0 w-full h-full z-0 opacity-0 group-hover:opacity-100 duration-200"
          id={`service-${index}`}
        >
          <Image
            alt="image"
            src={placeholder}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <Layer
            style={{ background: "linear-gradient(transparent, #244857)" }}
            className="opacity-100"
          />
        </div>
        <div className="absolute top-8 end-8 scale-[3] opacity-50 -rotate-45">
          {icon}
        </div>
        <div className="size-16 relative z-10 rounded-full mb-8 bg-white flex items-center justify-center group-hover:text-black">
          {icon}
        </div>
        <h2 className="font-semibold text-2xl relative z-10">
          {servicesTrans(`service-${index}.title`)}
        </h2>
        <p className="font-normal text-lg relative z-10">
          {servicesTrans(`service-${index}.caption`)}
        </p>
      </article>
    </Link>
  );
};
