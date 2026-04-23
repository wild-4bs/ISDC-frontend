"use client";
import LargeLogo from "@/assets/large-logo.svg";
import { Link, useRouter } from "@/i18n/routing";
import { tokenStore } from "@/lib/tokenStore";
import { useUserStore } from "@/stores/userStore";
import {
  Facebook,
  Instagram,
  LogOutIcon,
  Mail,
  MapPin,
  Phone,
  PhoneIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "./Container";
import { NAV_LINKS } from "./Header";
import { Button } from "./ui/button";

export const Footer = () => {
  const footerTrans = useTranslations("footer");
  const linksTrans = useTranslations("links");
  const router = useRouter();

  const { clear, user } = useUserStore();
  const logout = () => {
    tokenStore.clear();
    clear();
    router.replace("/login");
  };
  return (
    <footer className="py-10 pb-4 border-t border-t-gray-300 relative overflow-hidden">
      <Container className="flex lg:justify-between max-lg:flex-col gap-3">
        <div className="flex flex-col z-10 realtive">
          {/* <FooterLogo className="mb-2" /> */}
          <h3 className="text-lg font-semibold">
            {footerTrans.rich("headline", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h3>
          <div className="mt-2">
            <h3 className="text-base font-bold">تابعنا على:</h3>
            <div className="flex items-center flex-wrap">
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
            {!user ? (
              <Link href={"/login"}>
                <Button size={"sm"}>{footerTrans("login")}</Button>
              </Link>
            ) : (
              <Button theme={"danger"} size={"sm"} onClick={logout}>
                تسجيل الخروج <LogOutIcon size={14} />
              </Button>
            )}
            {NAV_LINKS?.map((link, i) => (
              <li key={i}>
                <Link href={link.path}>{linksTrans(link.name)}</Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2 font-semibold">
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
        <div className="absolute bottom-0 max-lg:hidden left-2/4 -translate-x-2/4 z-0 flex flex-col items-center justify-center w-full pointer-events-none">
          <LargeLogo className="scale-70" />
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
