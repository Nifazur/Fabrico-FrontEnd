// import Profile from "@/components/dashboardComponents/Profile";
// import UserDashboard from "@/pages/dashboards/user/dashboard/UserDashboard";
// import Orders from "@/pages/dashboards/user/orders/Orders";
// import Cart from "@/pages/dashboards/user/cart/Cart";
// import Wishlist from "@/pages/dashboards/user/wishlist/Wishlist";
// import AddressBook from "@/pages/dashboards/user/address/AddressBook";
// import Security from "@/pages/dashboards/user/security/Security";

import { CartPage } from "../pages/user/CartPage";
import { CheckoutPage } from "../pages/user/CheckoutPage";
import Dashboard from "../pages/user/Dashboard";
import { MyOrdersPage } from "../pages/user/MyOrdersPage";
import { OrderDetailsPage } from "../pages/user/OrderDetailsPage";
import type { ISidebarItem } from "../types";

// // Order Sub-pages
// import OrderHistory from "@/pages/dashboards/user/orders/OrderHistory";
// import OrderDetails from "@/pages/dashboards/user/orders/OrderDetails";
// import TrackOrder from "@/pages/dashboards/user/orders/TrackOrder";

// // Address Sub-pages
// import AddAddress from "@/pages/dashboards/user/address/AddAddress";
// import EditAddress from "@/pages/dashboards/user/address/EditAddress";

// import type { ISidebarItem } from "@/types";
import {
    BarChart3,
    Package,
    ShoppingBag,
    ShoppingCart,
    //   ShoppingCart,
    //   ShoppingBag,
    //   Heart,
    //   MapPin,
    //   Shield,
    //   User,
    //   Package
} from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/user/dashboard",
                component: Dashboard,
                icon: BarChart3,
            }
        ],
    },
      {
        title: "Shopping",
        items: [
          {
            title: "My Cart",
            url: "/user/cart",
            component: CartPage,
            icon: ShoppingCart,
          },
        //   {
        //     title: "Wishlist",
        //     url: "/user/wishlist",
        //     component: Wishlist,
        //     icon: Heart,
        //   }
        ],
      },
    {
        title: "Order Management",
        items: [
            {
                title: "CheckOut",
                url: "/user/CheckOut",
                component: CheckoutPage,
                icon: ShoppingBag,
            },
            {
                title: "My Orders",
                url: "/user/orders",
                component: MyOrdersPage,
                icon: ShoppingBag,
            },
            {
                title: "Track Order",
                url: "/user/orders/:orderNumber",
                component: OrderDetailsPage,
                icon: Package,
            }
        ],
    },
    //   {
    //     title: "Account Settings",
    //     items: [
    //       {
    //         title: "Profile",
    //         url: "/user/profile",
    //         component: Profile,
    //         icon: User,
    //       },
    //       {
    //         title: "Address Book",
    //         url: "/user/addresses",
    //         component: AddressBook,
    //         icon: MapPin,
    //       },
    //       {
    //         title: "Security",
    //         url: "/user/security",
    //         component: Security,
    //         icon: Shield,
    //       }
    //     ],
    //   },
];