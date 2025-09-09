
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import type { Role } from "../types";
import { useGetMeQuery } from "../redux/features/userApi";
import LoadingPage from "../components/Layout/LoadingPage";


export const withAuth = (
  Component: ComponentType,
  requiredRole?: Role | Role[]
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMeQuery(undefined);

    const user = data?.data;
    if (isLoading) {
      return <LoadingPage></LoadingPage>;
    }

    if (!user?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
      const userRoles: Role[] = user?.role ?? [];

      if (Array.isArray(requiredRole)) {
        const hasRole = requiredRole.some((role) => userRoles.includes(role));
        if (!hasRole) {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        if (!userRoles.includes(requiredRole)) {
          return <Navigate to="/unauthorized" replace />;
        }
      }
    }

    return <Component />;
  };
};