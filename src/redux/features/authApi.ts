import { baseApi } from "../baseApi";
import type { 
  IResponse, 
  ILoginRequest, 
  IAuthResponse, 
  IResetPasswordRequest 
} from "../../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    // Login with credentials
    login: builder.mutation<IResponse<IAuthResponse>, ILoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
      invalidatesTags: ["AUTH", "USER"],
    }),

    // Logout
    logout: builder.mutation<IResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["AUTH", "USER", "CART", "ORDER"],
    }),

    // Get new access token using refresh token
    refreshToken: builder.mutation<IResponse<{ accessToken: string }>, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      invalidatesTags: ["AUTH"],
    }),

    // Reset password (requires authentication)
    resetPassword: builder.mutation<IResponse<null>, IResetPasswordRequest>({
      query: (passwordData) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: passwordData,
      }),
    }),

    // Google OAuth redirect URL (just for getting the URL)
    googleAuth: builder.query<void, { redirect?: string }>({
      query: ({ redirect = "/" } = {}) => ({
        url: `/auth/google?redirect=${redirect}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useGoogleAuthQuery,
} = authApi;