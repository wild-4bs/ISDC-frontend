import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Blog = () => {
  const commonTrans = useTranslations("common")
  return (
    <article className="rounded-3xl overflow-hidden border border-muted shadow-sm" dir="rtl">
      <div className="thumbnail">
        <Image
          src={"/home/blogs/1.png"}
          alt="blog"
          width={1000}
          height={1000}
          className="w-full h-[272px] object-cover"
        />
      </div>
      <div className="content p-5 pb-3 flex flex-col gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
            <Calendar />
            <span>ديسمبر,2025,15</span>
          </div>
          <h3 className="font-bold text-xl mb-1">نصائح لابتسامة صحية ومشرقة</h3>
          <p className="text-subtitle-color text-lg font-normal">
            اكتشف ممارسات بسيطة وفعالة للحفاظ على أسنانك صحية ولامعة.
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
