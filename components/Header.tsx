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

const isActive = (pathname: string, linkPath: string) =>
  pathname === linkPath || (linkPath !== "/" && pathname.startsWith(linkPath));

export const Header = () => {
  const linksTrans = useTranslations("links");
  const headerTrans = useTranslations("header");
  const commonTrans = useTranslations("common");
  const { user } = useUserStore();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm"
        dir="ltr"
      >
        {/* Info bar */}
        <div className="min-h-info-header-height bg-primary text-white text-sm hidden md:flex items-center">
          <Container className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Facebook />
                <Instagram />
                <Whatsapp />
              </div>
              <div className="flex items-center gap-2">
                <Phone />
                <span>+946 782 593 3888</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>{headerTrans("location")}</span>
              <Location />
            </div>
          </Container>
        </div>

        {/* Main nav */}
        <Container>
          <div className="flex items-center justify-between h-links-header-height gap-4">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop links */}
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
            </ul>

            {/* Right actions — always visible */}
            <div className="flex items-center gap-2">
              {user?.role !== "admin" && user && (
                <Link href="/profile">
                  <Button
                    variant={
                      isActive(pathname, "/profile") ? "solid" : "outline"
                    }
                    size="icon"
                  >
                    <User size={20} />
                  </Button>
                </Link>
              )}
              {user?.role === "admin" && (
                <Link href="/dashboard">
                  <Button variant="outline" size="icon">
                    <LayoutDashboard size={20} />
                  </Button>
                </Link>
              )}
              {!user && (
                <Link href="/login">
                  <Button theme="secondary" size="sm">
                    {commonTrans("login")}
                  </Button>
                </Link>
              )}

              {/* Burger — mobile only */}
              <Button
                variant="ghost"
                className="md:hidden [&_svg]:size-5!"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open Menu"
              >
                <Menu size={24} strokeWidth={2} />
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl flex flex-col animate-slide-left">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <Link href="/" onClick={() => setSidebarOpen(false)}>
                <Logo />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close Menu"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={clsx(
                        "flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted",
                        isActive(pathname, link.path)
                          ? "font-semibold bg-primary/10 text-primary"
                          : "text-foreground",
                      )}
                    >
                      {linksTrans(link.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Drawer footer — info */}
            <div className="px-5 py-4 border-t bg-muted/40 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="shrink-0" />
                <span>+946 782 593 3888</span>
              </div>
              <div className="flex items-center gap-2">
                <Location className="shrink-0" />
                <span>{headerTrans("location")}</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Facebook />
                <Instagram />
                <Whatsapp />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
