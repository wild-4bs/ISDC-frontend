import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn, getDir } from "@/lib/utils";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryClientProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "المركز الدولي لزراعة و تجميل الاسنان",
    template: "%s | المركز الدولي",
  },
  description:
    "المركز التخصصي الوحيد المجاز من وزارة الصحة العراقية في كربلاء. خدمات شاملة: زراعة الأسنان، تقويم، تجميل، حشوات، أشعة ثلاثية الأبعاد. احجز موعدك اليوم.",
  keywords: [
    "طبيب أسنان كربلاء",
    "زراعة أسنان كربلاء",
    "تقويم أسنان",
    "تجميل أسنان",
    "حشوات الجذور",
    "أشعة ثلاثية الأبعاد",
    "مركز أسنان كربلاء",
    "ISDC",
    "isdc",
    "i.s.d.c",
  ],
  openGraph: {
    title: "المركز الدولي لزراعة و تجميل الاسنان",
    description:
      "22 سنة من الخبرة في طب الأسنان. زراعة، تقويم، تجميل، وأكثر — في قلب كربلاء المقدسة.",
    siteName: "المركز الدولي لزراعة و تجميل الاسنان",
    locale: "ar_IQ",
    type: "website",
    images: [{ url: "/seo/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "المركز الدولي لزراعة و تجميل الاسنان",
    description:
      "22 سنة من الخبرة في طب الأسنان. زراعة، تقويم، تجميل، وأكثر — في قلب كربلاء المقدسة.",
    images: ["/seo/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = getDir(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={cn("antialiased", tajawal.className)}>
        <NextIntlClientProvider messages={messages}>
          <Toaster richColors closeButton />
          <QueryProvider>
            <AuthProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
