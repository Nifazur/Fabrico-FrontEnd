import { baseApi } from "../baseApi";
import type { 
  IResponse, 
  IUser, 
  IUpdateProfileRequest, 
  IChangePasswordRequest,
  IUsersQuery,
} from "../../types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getMe: builder.query<IResponse<IUser>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // Update current user profile
    updateMe: builder.mutation<IResponse<IUser>, IUpdateProfileRequest>({
      query: (updateData) => ({
        url: "/users/me",
        method: "PATCH",
        data: updateData,
      }),
      invalidatesTags: ["USER"],
    }),

    // Change password
    changePassword: builder.mutation<IResponse<{ message: string }>, IChangePasswordRequest>({
      query: (passwordData) => ({
        url: "/users/change-password",
        method: "PATCH",
        data: passwordData,
      }),
    }),

    // Get all users (Admin only)
    getAllUsers: builder.query<IResponse<IUser[]>, IUsersQuery>({
      query: (params = {}) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    // Delete user (Admin only)
    deleteUser: builder.mutation<IResponse<IUser>, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = userApi;