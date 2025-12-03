import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
