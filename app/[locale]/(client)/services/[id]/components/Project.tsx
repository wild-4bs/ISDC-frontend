import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Project = () => {
  const commonTrans = useTranslations("common");
  return (
    <article className="rounded-xl overflow-hidden border border-input shadow-xs flex flex-col gap-1">
      <Image
        src={"/projects/2.png"}
        width={1000}
        height={1000}
        alt="project"
        className="w-full h-auto object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1 mb-5">
          <h3 className="font-bold text-xl mb-1">ابتسامة جديدة مع عدسات الأسنان التجميلية للأطفال</h3>
          <p>
            قام فريقنا بتركيب عدسات تجميلية (Veneers) عالية الجودة لطفل يعاني من
            تصبغات وتفاوت في شكل الأسنان. النتيجة كانت ابتسامة طبيعية وأكثر
            إشراقًا، ساعدته على الشعور بالراحة والثقة أثناء التحدث والابتسام،
          </p>
        </div>
        <Button
          variant={"ghost"}
          className="w-fit text-primary hover:text-primary/90 hover:bg-primary/10 rounded-full"
        >
          {commonTrans("readMore")} <ArrowLeft />
        </Button>
      </div>
    </article>
  );
};
