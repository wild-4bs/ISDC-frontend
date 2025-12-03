import Container from "@/components/Container";
import Prosedure from "@/assets/icons/procedure.svg";
import { ImageIcon } from "lucide-react";
import { XRayImage } from "./components/XRayImage";
import { useTranslations } from "next-intl";

export default function page() {
  const trans = useTranslations("profile.appointments.appointmentPage");
  const commonTrans = useTranslations("common");
  return (
    <main className="py-10">
      <Container>
        <header className="mb-1.5">
          <h1 className="font-bold leading-5">الاحد, سبتمبر 2025</h1>
          <p>2:00 {commonTrans("PM")}</p>
        </header>
        <article className="p-5 border border-input rounded-xl bg-white shadow-xs mt-3">
          <header className="pb-3 border-b border-b-input flex items-center gap-2">
            <Prosedure />
            <h2 className="font-bold text-lg">{trans("explanation.title")}</h2>
          </header>
          <p className="mt-3">
            تم إجراء فحص شامل للأسنان وتشخيص وجود تسوس في الضرس الأيمن السفلي.
            قمنا بتنظيف السن المصاب وإزالة التسوس بالكامل، ثم تم حشو السن بمادة
            الكومبوزيت البيضاء لاستعادة شكله الطبيعي. تم أيضاً إجراء تنظيف عام
            للأسنان وإزالة الجير المتراكم باستخدام تقنية الموجات فوق الصوتية.
            المريضة تحتاج إلى متابعة دورية كل 6 أشهر للحفاظ على صحة أسنانها.
            نصائح مهمة: استخدام الخيط السني يومياً، تجنب المشروبات السكرية،
            والمضمضة بغسول الفم المناسب.تم إجراء فحص شامل للأسنان وتشخيص وجود
            تسوس في الضرس الأيمن السفلي. قمنا بتنظيف السن المصاب وإزالة التسوس
            بالكامل، ثم تم حشو السن بمادة الكومبوزيت البيضاء لاستعادة شكله
            الطبيعي. تم أيضاً إجراء تنظيف عام للأسنان وإزالة الجير المتراكم
            باستخدام تقنية الموجات فوق الصوتية. المريضة تحتاج إلى متابعة دورية
            كل 6 أشهر للحفاظ على صحة أسنانها. نصائح مهمة: استخدام الخيط السني
            يومياً، تجنب المشروبات السكرية، والمضمضة بغسول الفم المناسب.
          </p>
        </article>
        <article className="p-5 border border-input rounded-xl bg-white shadow-xs mt-3">
          <header className="pb-3 border-b border-b-input flex items-center gap-2">
            <ImageIcon className="text-primary" />
            <h2 className="font-bold text-lg">{trans("images.title")}</h2>
          </header>
          <div className="grid grid-cols-4 mt-4 gap-4">
            <XRayImage />
            <XRayImage />
            <XRayImage />
            <XRayImage />
            <XRayImage />
          </div>
        </article>
      </Container>
    </main>
  );
}
