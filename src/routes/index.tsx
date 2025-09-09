import { createBrowserRouter, Navigate } from 'react-router';
// import MainLayout from '../layouts/MainLayout';
// import DashboardLayout from '../layouts/DashboardLayout';
// import withAuth from '../components/withAuth';
// import { generateRoutes } from '../utils/generateRoutes';
// import { adminSidebarItems } from './adminRoutes';
// import { userSidebarItems } from './userRoutes';
// import { role } from '../constants/role';
// import { TRole } from '../types/role';

// Public Pages
import Home from '../pages/public/1.Home/Home';
import App from '../App';
import LoginPage from '../pages/Auth/1.Login/Login';
import Register from '../pages/Auth/2.Register/Register';
import { ProductListing } from '../components/Product/ProductListing';
import { ProductDetailsPage } from '../pages/public/2.Product/ProductDetailsPage';
import ErrorPage from '../components/Layout/ErrorPage';
import { withAuth } from '../utils/withAuth';
import { generateRoutes } from '../utils/generateRoutes';
import { adminSidebarItems } from './adminRoutes';
import { userSidebarItems } from './userRoutes';
import { role } from '../constants/role';
import type { Role } from '../types';
import DashboardLayout from '../components/dashboardLayout/DashboardLayout';
import AboutUsPage from '../pages/public/About';
import { UpdateProductPage } from '../pages/admin/UpdateProductPage';
// import Products from '../pages/Products';
// import ProductDetails from '../pages/ProductDetails';
// import About from '../pages/About';
// import Contact from '../pages/Contact';
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
// import ForgotPassword from '../pages/auth/ForgotPassword';
// import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        // errorElement: <NotFound />,
        children: [
            {
                index: true,
                Component: Home,
            },
              {
                path: 'products',
                Component: ProductListing,
              },
              {
                path: ':gender/products',
                Component: ProductListing,
              },
              {
                path: 'products/:slug',
                Component: ProductDetailsPage,
              },
              {
                path: 'about',
                Component: AboutUsPage,
              },
            //   {
            //     path: 'contact',
            //     Component: Contact,
            //   },
            //   // Auth Routes
            {
                path: "login",
                Component: LoginPage
            },
            {
                path: "register",
                Component: Register
            },
            //   {
            //     path: 'forgot-password',
            //     Component: ForgotPassword,
            //   },
        ],
    },
   // Admin Dashboard Routes
      {
        Component: withAuth(DashboardLayout, [role.admin, role.superAdmin] as Role[]),
        path: "/admin",
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          ...generateRoutes(adminSidebarItems),
          {
            path: "/admin/products/edit/:slug",
            Component: UpdateProductPage
          }
        ]
      },
      // User Dashboard Routes
      {
        Component: withAuth(DashboardLayout, [role.user] as Role[]),
        path: "/user",
        children: [
          { index: true, element: <Navigate to="dashboard" /> },
          ...generateRoutes(userSidebarItems),
        ]
      },
    //   // Catch all route
      {
        path: '*',
        Component: ErrorPage,
      },
]);