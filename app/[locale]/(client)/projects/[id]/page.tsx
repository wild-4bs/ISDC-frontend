import Container from "@/components/Container";
import { Blog } from "../../components/blogs/Blog";

export default function page() {
  return (
    <main>
      <Container className="min-h-[20vh] pt-12 max-md:pt-8">
        <header>
          <span className="px-6 py-1 border border-primary rounded-full bg-primary/10 text-primary mb-6 inline-block">
            طب الأسنان التجميلي
          </span>
          <h1 className="font-bold text-4xl mb-1">تبييض الأسنان الاحترافي</h1>
          <p className="text-lg">
            إجراء تجميلي للأسنان يهدف إلى تفتيح ابتسامة المريض بإزالة البقع
            والتصبغات. أُجري العلاج باستخدام تقنية الليزر المتطورة لضمان نتائج
            آمنة وفعالة.
          </p>
        </header>
      </Container>
      <div className="w-full relative flex justify-center h-[500px] mt-20 mb-16">
        <div className="w-full h-[70%] z-0 absolute top-2/4 -translate-y-2/4 start-0 bg-blue-100"></div>
        <Container className="h-full flex justify-center">
          <div className="main w-full max-w-[1000px] relative z-10 h-full border-2 border-primary/20 bg-primary/20"></div>
        </Container>
      </div>
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </Container>
    </main>
  );
}
