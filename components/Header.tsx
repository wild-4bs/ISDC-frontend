"use client";

import Location from "@/assets/icons/location.svg";
import Logo from "@/assets/logo.svg";
import Facebook from "@/assets/social/facbook.svg";
import Instagram from "@/assets/social/instagram.svg";
import Phone from "@/assets/social/phone.svg";
import Whatsapp from "@/assets/social/whatsapp.svg";
import { Link, usePathname } from "@/i18n/routing";
import { useUserStore } from "@/stores/userStore";
import clsx from "clsx";
import { LayoutDashboard, Menu, User, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Container from "./Container";
import { Button } from "./ui/button";

export const NAV_LINKS = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "doctors", path: "/doctors" },
  { name: "news", path: "/news" },
];

const isActive = (pathname: string, linkPath: string) => {
  return (
    pathname === linkPath || (linkPath !== "/" && pathname.startsWith(linkPath))
  );
};

export const Header = () => {
  const linksTrans = useTranslations("links");
  const headerTrans = useTranslations("header");
  const commonTrans = useTranslations("common");
  const { user } = useUserStore();

  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-50 bg-white" dir="ltr">
        <div className="min-h-info-header-height max-md:py-4 bg-primary text-white text-sm flex items-center">
          <Container className="flex md:justify-between md:items-center max-md:flex-col gap-1">
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
            <div className="flex items-center gap-2 text-sm">
              <span>{headerTrans("location")}</span>
              <Location />
            </div>
          </Container>
        </div>
        <Container>
          <div className="flex items-center justify-between h-links-header-height">
            <Link href="/">
              <Logo />
            </Link>
            <ul className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={clsx(
                      "text-sm leading-5 transition-colors hover:opacity-70",
                      isActive(pathname, link.path) && "font-bold",
                    )}
                  >
                    {linksTrans(link.name)}
                  </Link>
                </li>
              ))}
              {user && user.role != "admin" && (
                <Link href={"/profile"}>
                  <Button
                    variant={
                      isActive(pathname, "/profile") ? "solid" : "outline"
                    }
                    size="icon"
                    // className={clsx({
                    //   "text-foreground": !isActive(pathname, "/profile"),
                    // })}
                  >
                    <User size={20} />
                  </Button>
                </Link>
              )}
              {user && user.role == "admin" && (
                <Link href={"/dashboard"}>
                  <Button variant={"outline"} size={"icon"}>
                    <LayoutDashboard size={20} />
                  </Button>
                </Link>
              )}
              {!user && (
                <Link href={"/login"}>
                  <Button theme={"secondary"} size={"sm"}>
                    {commonTrans("login")}
                  </Button>
                </Link>
              )}
            </ul>
            <Button
              variant="ghost"
              className="md:hidden text-foreground [&_svg]:size-5!"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={32} strokeWidth={2} />
            </Button>
          </div>
        </Container>
      </header>
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-lg animate-slide-left">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close Menu"
                  theme={"danger"}
                >
                  <X size={22} />
                </Button>
              </div>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={clsx(
                        "text-sm leading-5 transition-colors hover:text-primary",
                        pathname === link.path && "font-bold",
                      )}
                    >
                      {linksTrans(link.name)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-2">
                {user && user.role != "admin" && (
                  <Link href={"/profile"}>
                    <Button
                      variant={
                        isActive(pathname, "/profile") ? "solid" : "outline"
                      }
                      size="icon"
                      className="w-full"
                    >
                      <User size={20} />
                    </Button>
                  </Link>
                )}
                {user && user.role == "admin" && (
                  <Link href={"/dashboard"}>
                    <Button
                      variant={"ghost"}
                      className="text-foreground w-full"
                    >
                      <LayoutDashboard size={20} />
                    </Button>
                  </Link>
                )}
                {!user && (
                  <Link href={"/login"}>
                    <Button theme={"secondary"} size={"sm"} className="w-full">
                      {commonTrans("login")}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
