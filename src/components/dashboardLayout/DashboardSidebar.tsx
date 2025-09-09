import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";
import { Link, NavLink, useLocation } from "react-router-dom"; // react-router v6+
import { getSidebarItems } from "../../utils/getSidebarItems";
import { useGetMeQuery } from "../../redux/features/userApi";
import type { ISidebarSubItem } from "../../types";
import { useTheme } from "../../hooks/useTheme";

function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const { data: userData } = useGetMeQuery(undefined);
  const location = useLocation();

  const sidebarItems = getSidebarItems(userData?.data?.role);

  return (
    <Sidebar {...props} className="z-50">
      {/* Header */}
      <SidebarHeader className="items-center p-6 pt-2">
        <NavLink to="/" className="flex items-center">
          <img
            src={theme === "dark" ? "/darkLogo.png" : "/lightLogo.png"}
            className="h-[45px] w-auto"
            alt="Logo"
          />
        </NavLink>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item: ISidebarSubItem) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                            ? "text-primary bg-primary/10"
                            : "hover:bg-accent"
                          }`}
                      >
                        <Link to={item.url} className="flex items-center gap-2 w-full">
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}

export default DashboardSidebar;