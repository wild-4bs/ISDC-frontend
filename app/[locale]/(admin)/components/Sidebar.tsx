"use client";
import Logo from "@/assets/common/logo.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { SidebarLinks } from "@/lib/data/sidebar-links";
import { tokenStore } from "@/lib/tokenStore";
import { useUserStore } from "@/stores/userStore";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const { clear } = useUserStore();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    setIsPending(true);
    await Promise.all([tokenStore.clear(), clear()]);
    router.replace("/login");
    setIsPending(false);
  };
  return (
    <aside
      className="bg-background w-16 lg:w-dashboard-sidebar-width border-e border-e-input shadow-sm flex flex-col sticky top-0 right-0 h-[100dvh]"
      style={{ gridArea: "sidebar" }}
    >
      <div className="flex items-center justify-center gap-3 pb-3 border-b border-b-input h-dashboard-header-height">
        <Logo className="shrink-0" />
      </div>

      <ul className="flex-1 flex flex-col gap-2 p-3">
        {SidebarLinks.map((link, i) => (
          <li key={i}>
            <Link
              href={link.path}
              className={clsx(
                "flex items-center justify-center lg:justify-start gap-2 font-medium text-sm px-3 py-3 rounded-md hover:bg-primary/5 duration-200",
                {
                  "bg-primary text-primary-foreground hover:bg-primary/90":
                    pathname === link.path ||
                    (link.path !== "/dashboard" &&
                      pathname.startsWith(link.path)),
                },
              )}
            >
              <span className="shrink-0">{link.icon}</span>
              <span className="hidden lg:inline truncate">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Button
        className="justify-center lg:justify-start m-3"
        theme={"danger"}
        variant="ghost"
        onClick={logout}
      >
        <LogOut className="shrink-0" />
        <span className="hidden lg:inline">تسجيل الخروج</span>
      </Button>
    </aside>
  );
};
