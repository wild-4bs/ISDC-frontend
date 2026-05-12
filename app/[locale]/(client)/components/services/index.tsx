import Container from "@/components/Container";
import {
  AlignCenter,
  Crown,
  HeartPulse,
  ScanLine,
  ShieldPlus,
  Sparkles,
  Syringe,
  Wind,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Service } from "./Service";

const SERVICES: {
  image: string;
  icon: React.ReactNode;
}[] = [
  {
    // Fillings & Root Canals - صورة تظهر اهتمام الطبيب بالمريض في بيئة هادئة
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    icon: <ShieldPlus width={40} />,
  },
  {
    // Cosmetic Dentistry (طب الأسنان التجميلي) - ابتسامة مثالية وواضحة
    image:
      "https://images.unsplash.com/photo-1684607631747-045ecfeeb4c7?q=80&w=3431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <Sparkles width={40} />,
  },
  {
    // Orthodontics - صورة قريبة لابتسامة مرتبة (تلميح للتقويم الشفاف أو المنتظم)
    image:
      "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=800&q=80",
    icon: <AlignCenter width={40} />,
  },
  {
    // Fixed Prosthetics - تركيز على دقة العمل السني (Crowns/Bridges)
    image:
      "https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?w=800&q=80",
    icon: <Crown width={40} />,
  },
  {
    // 3D Imaging - تكنولوجيا الأشعة الحديثة (Dental X-ray)
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    icon: <ScanLine width={40} />,
  },
  {
    // Gum Treatment - صورة تعكس الصحة الفموية والراحة
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    icon: <HeartPulse width={40} />,
  },
  {
    // Dental Implants (زراعة الأسنان) - موديل يشرح شكل الزرعة أو طبيب يشرح العملية
    // هذه الصورة تظهر العملية بشكل احترافي وليس جراحي مخيف
    image:
      "https://plus.unsplash.com/premium_photo-1674998790004-1c08a997011c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <Syringe width={40} />,
  },
  {
    // GPT Cleaning (Air-Flow / Prophylaxis) - عملية تنظيف الأسنان بالهواء والماء
    image:
      "https://images.unsplash.com/photo-1600721187850-c944924fd48a?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <Wind width={40} />,
  },
];

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
          {SERVICES.map((service, index) => (
            <Service
              placeholder={service.image}
              key={index}
              icon={service.icon}
              index={index + 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
