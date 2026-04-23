import { User } from "@/types/user";

type Permission = "view_dashboard" | "view_profile";

const rolePermissions: Record<User["role"], Permission[]> = {
  admin: ["view_dashboard"],
  patient: ["view_profile"],
};

export const hasPermission = (
  role: User["role"],
  requiredPermission: Permission,
): boolean => {
  const permissions = rolePermissions[role];

  if (!permissions) return false;

  return permissions.includes(requiredPermission);
};
