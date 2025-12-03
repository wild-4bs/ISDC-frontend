import Container from "./Container";
import FooterLogo from "@/assets/footer-logo.svg";
import { Button } from "./ui/button";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  PhoneIcon,
} from "lucide-react";
import LargeLogo from "@/assets/large-logo.svg";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const footerTrans = useTranslations("footer");
  return (
    <footer className="py-10 pb-4 border-t border-t-gray-300 relative overflow-hidden">
      <Container className="flex lg:justify-between max-lg:flex-col gap-8">
        <div className="flex flex-col z-10 realtive">
          <FooterLogo className="mb-2" />
          <h3 className="text-lg font-semibold">
            {footerTrans.rich("headline", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h3>
          <div className="social mt-4">
            <h3 className="text-base font-bold mb-2">
              {footerTrans("followUs")}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant={"ghost"}>
                <Facebook />
              </Button>
              <Button variant={"ghost"}>
                <Instagram />
              </Button>
              <Button variant={"ghost"}>
                <Phone />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ul className="flex items-center gap-4 max-sm:flex-col">
            <Button>{footerTrans("login")}</Button>
            <li>
              <Link href={"#"}>{footerTrans("links.blogs")}</Link>
            </li>
            <li>
              <Link href={"#"}>{footerTrans("links.projects")}</Link>
            </li>
            <li>
              <Link href={"#"}>{footerTrans("links.news")}</Link>
            </li>
            <li>
              <Link href={"#"}>{footerTrans("links.about")}</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-4 font-semibold">
            <li className="flex items-center gap-2 text-sm">
              <MapPin width={18} />
              <span>{footerTrans("location")}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail width={18} />
              <span>info@dental-office.com</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <PhoneIcon width={18} />
              <span>+964 7830000124</span>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-2 max-lg:hidden left-2/4 -translate-x-2/4 z-0 flex flex-col items-center justify-center gap-1 w-full pointer-events-none">
          <LargeLogo />
          <p className="text-sm text-subtitle-color text-center">
            Copyright 2025. wild&snail.com All rights reserved
          </p>
        </div>
        <p className="text-sm text-subtitle-color text-center lg:hidden">
          Copyright 2025. wild&snail.com All rights reserved
        </p>
      </Container>
    </footer>
  );
};
