// import Profile from "@/components/dashboardComponents/Profile";
// import AdminDashboard from "@/pages/dashboards/admin/dashboard/AdminDashboard";
// import UserManagement from "@/pages/dashboards/admin/userManagement/UserManagement";
// import ProductManagement from "@/pages/dashboards/admin/productManagement/ProductManagement";
// import OrderManagement from "@/pages/dashboards/admin/orderManagement/OrderManagement";
// import Analytics from "@/pages/dashboards/admin/analytics/Analytics";
// import Settings from "@/pages/dashboards/admin/settings/Settings";

import { BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import { DashboardOverviewPage } from "../pages/admin/DashboardOverviewPage";
import type { ISidebarItem } from "../types";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { AdminOrdersPage } from "../pages/admin/AdminOrdersPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import CreateProductPage from "../pages/admin/CreateProductPage";

// // Product Management Sub-pages
// import ProductList from "@/pages/dashboards/admin/productManagement/ProductList";
// import CreateProduct from "@/pages/dashboards/admin/productManagement/CreateProduct";
// import EditProduct from "@/pages/dashboards/admin/productManagement/EditProduct";

// // Order Management Sub-pages
// import OrderList from "@/pages/dashboards/admin/orderManagement/OrderList";
// import OrderDetails from "@/pages/dashboards/admin/orderManagement/OrderDetails";

// import type { ISidebarItem } from "@/";
// import {
//   BarChart3,
//   Package,
//   Users,
//   User,
//   ShoppingCart,
//   TrendingUp,
//   Settings as SettingsIcon
// } from "lucide-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
        component: DashboardOverviewPage,
        icon: BarChart3,
      }
    ],
  },
  {
    title: "Product Management",
    items: [
      {
        title: "All Products",
        url: "/admin/products",
        component: AdminProductsPage,
        icon: Package,
      },
      {
        title: "Create Product",
        url: "/admin/products/create",
        component: CreateProductPage,
        icon: Package,
      }
    ],
  },
  {
    title: "Order Management",
    items: [
      {
        title: "All Orders",
        url: "/admin/orders",
        component: AdminOrdersPage,
        icon: ShoppingCart,
      }
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        component: AdminUsersPage,
        icon: Users,
      },
    ],
  },
//   {
//     title: "Analytics",
//     items: [
//       {
//         title: "Reports",
//         url: "/admin/analytics",
//         component: Analytics,
//         icon: TrendingUp,
//       },
//     ],
//   },
//   {
//     title: "Settings",
//     items: [
//       {
//         title: "System Settings",
//         url: "/admin/settings",
//         component: Settings,
//         icon: SettingsIcon,
//       },
//     ],
//   },
//   {
//     title: "Account",
//     items: [
//       {
//         title: "Profile",
//         url: "/admin/profile",
//         component: Profile,
//         icon: User,
//       },
//     ],
//   },
];