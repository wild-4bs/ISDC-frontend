import Container from "@/components/Container";
import Image from "next/image";
import { Project } from "./components/Project";

export default function page() {
  return (
    <main className="mt-12">
      <Container>
        <header className="flex max-md:flex-col max-md:text-center max-md:gap-4 gap-24">
          <div className="title pt-12">
            <h1 className="font-bold text-4xl mb-2">
              ابتسامة صحية لطفلك اليوم
            </h1>
            <p className="font-medium text-lg">
              نقدم لأطفالكم أفضل خدمات طب أسنان الأطفال، باستخدام أحدث التقنيات
              العالمية، وبأيدي فريق من أمهر أطباء الأسنان المتخصصين في رعاية
              الفم والأسنان للأطفال بكل لطف واحتراف.
            </p>
          </div>
          <Image
            src={"/home/services/service-1.png"}
            width={1000}
            height={1000}
            alt="service"
            className="lg:min-w-[500px] max-md:max-w-full max-md:w-full max-w-[500px] shadow-sm h-auto object-cover w-full rounded-xl"
          />
        </header>
        <div className="my-12">
          <header className="text-center mb-8">
            <h2 className="font-bold text-3xl">الأعمال</h2>
            <p>
              نقدم مجموعة شاملة من خدمات طب الأسنان بأعلى معايير الجودة والأمان
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Project />
            <Project />
            <Project />
            <Project />
            <Project />
          </div>
        </div>
      </Container>
    </main>
  );
}
