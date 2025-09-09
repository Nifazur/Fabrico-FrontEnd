import { role } from "../constants/role";
import { adminSidebarItems } from "../routes/adminRoutes";
import { userSidebarItems } from "../routes/userRoutes";
import type { Role } from "../types";

export const getSidebarItems = (
  userRoles: Role[] = []
):
  | typeof adminSidebarItems
  | typeof userSidebarItems => {

  if (
    userRoles.includes(role.superAdmin as Role) ||
    userRoles.includes(role.admin as Role)
  ) {
    return [...adminSidebarItems];
  }

  if (userRoles.includes(role.user as Role)) {
    return [...userSidebarItems];
  }

  return [];
};