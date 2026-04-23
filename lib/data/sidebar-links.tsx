import {
  FolderKanban,
  History,
  LayoutDashboard,
  Newspaper,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { ReactNode } from "react";

export interface SidebarLink {
  icon?: ReactNode;
  label?: string;
  path: string;
}

export const SidebarLinks: SidebarLink[] = [
  {
    label: "الصفحة الرئيسية",
    icon: <LayoutDashboard size={18} />,
    path: "/dashboard",
  },
  {
    label: "المرضى",
    icon: <UsersRound size={18} />,
    path: "/dashboard/patients",
  },
  {
    label: "المشاريع",
    icon: <FolderKanban size={18} />,
    path: "/dashboard/projects",
  },
  {
    label: "المقالات",
    icon: <Newspaper size={18} />,
    path: "/dashboard/blogs",
  },
  {
    label: "الأطباء",
    icon: <Stethoscope size={18} />,
    path: "/dashboard/doctors",
  },
  {
    label: "سجل الاحداث",
    icon: <History size={18} />,
    path: "/dashboard/timeline",
  },
];
