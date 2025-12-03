"use client";

import Facebook from "@/assets/social/facbook.svg";
import Instagram from "@/assets/social/instagram.svg";
import Whatsapp from "@/assets/social/whatsapp.svg";
import Phone from "@/assets/social/phone.svg";
import Location from "@/assets/icons/location.svg";
import Logo from "@/assets/logo.svg";

import Container from "./Container";
import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "./ui/button";
import { Languages, Menu, User, X } from "lucide-react";

import { useState, useTransition } from "react";

const NAV_LINKS = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "doctors", path: "/doctors" },
  { name: "news", path: "/news" },
];

// Reusable component for rendering links
const NavLinks = ({
  linksTrans,
  pathname,
  onClick,
}: {
  linksTrans: (key: string) => string;
  pathname: string;
  onClick?: () => void;
}) => (
  <>
    {NAV_LINKS.map((link) => (
      <li key={link.path}>
        <Link
          href={link.path}
          onClick={onClick}
          className={clsx(
            "text-sm leading-5 transition-colors hover:text-primary",
            pathname === link.path && "font-bold"
          )}
        >
          {linksTrans(link.name)}
        </Link>
      </li>
    ))}
  </>
);

export const Header = () => {
  const linksTrans = useTranslations("links");
  const headerTrans = useTranslations("header");
  const commonTrans = useTranslations("common");

  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleLang = () => {
    startTransition(() => {
      router.replace(pathname, { locale: locale === "en" ? "ar" : "en" });
    });
  };

  return (
    <>
      {/* Top Social Bar */}
      <header className="sticky top-0 left-0 w-full z-50 bg-white" dir="ltr">
        <div className="min-h-[60px] max-md:py-4 bg-primary text-white text-sm flex items-center">
          <Container className="flex md:justify-between md:items-center max-md:flex-col gap-1">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Facebook />
                <Instagram />
                <Whatsapp />
              </div>
              <div className="flex items-center gap-2">
                <Phone />
                <span>+946 782 593 3888</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 text-sm">
              <span>{headerTrans("location")}</span>
              <Location />
            </div>
          </Container>
        </div>

        {/* Main Header */}
        <Container>
          <div className="flex items-center justify-between h-[100px]">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-6">
              <NavLinks linksTrans={linksTrans} pathname={pathname} />

              <Link href={"/profile"}>
                <Button variant={pathname == "/profile" ? "default" : "ghost"}>
                  <User size={20} />
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={toggleLang}
                aria-label="Toggle Language"
              >
                <Languages size={20} />
              </Button>
              <Link href={"/login"}>
                <Button className="w-full bg-black text-white hover:bg-black/90">
                  {commonTrans("login")}
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open Menu"
                className="md:hidden"
              >
                <Menu size={22} />
              </Button>
            </ul>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </Button>
          </div>
        </Container>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-lg animate-slide-left">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </Button>
              </div>

              <ul className="space-y-4">
                <NavLinks
                  linksTrans={linksTrans}
                  pathname={pathname}
                  onClick={() => setSidebarOpen(false)}
                />
              </ul>

              {/* Actions */}
              <div className="mt-8 space-y-4">
                <Link href={"/profile"} className="w-full">
                  <Button
                  className="w-full"
                    variant={pathname == "/profile" ? "default" : "ghost"}
                  >
                    <User size={20} />
                  </Button>
                </Link>
                <Button variant="ghost" onClick={toggleLang} className="w-full">
                  <Languages size={20} />
                </Button>
                <Link href={"/login"}>
                  <Button className="w-full bg-black text-white hover:bg-black/90">
                    {commonTrans("login")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
