import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const Project = () => {
  const commonTrans = useTranslations("common");
  return (
    <Link href={"/projects/id"}>
      <article className="rounded-2xl border border-input shadow-xs overflow-hidden">
        <Image
          src={"/home/blogs/1.png"}
          alt="blog"
          width={1000}
          height={1000}
          className="w-full h-[345px] object-cover"
        />
        <div className="px-5 py-4 pb-3">
          <h2 className="mb-1 font-bold text-xl">زراعة الاسنلن الفوريه</h2>
          <p>
            قام فريقنا بتركيب عدسات تجميلية (Veneers) عالية الجودة لمريض يعاني
            من اصفرار وتفاوت في شكل الأسنان. النتيجة كانت ابتسامة طبيعية وأكثر
            إشراقًا أعادت له الثقة بنفسه.
          </p>
          <Button className="w-fit rounded-full mt-4">
            {commonTrans("readMore")}
            <ArrowLeft className="ltr:rotate-180" />
          </Button>
        </div>
      </article>
    </Link>
  );
};
