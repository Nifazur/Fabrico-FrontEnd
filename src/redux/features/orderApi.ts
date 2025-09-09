import { baseApi } from "../baseApi";
import type { 
  IResponse, 
  IOrder, 
  ICreateOrderRequest, 
  IOrderQuery, 
  IUpdateOrderStatusRequest 
} from "../../types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create order
    createOrder: builder.mutation<IResponse<IOrder>, ICreateOrderRequest>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        data: orderData,
      }),
      invalidatesTags: ["ORDER", "CART"],
    }),

    // Get user's orders
    getMyOrders: builder.query<IResponse<IOrder[]>, IOrderQuery>({
      query: (params = {}) => ({
        url: "/orders/me",
        method: "GET",
        params,
      }),
      providesTags: ["ORDER"],
    }),

    getOrderByNumber: builder.query<IResponse<IOrder>, string>({
      query: (orderNumber) => ({
        url: `/orders/${orderNumber}`, // Assuming this is your API route
        method: "GET",
      }),
      providesTags: ['ORDER'],
    }),

    // Get all orders (Admin only)
    getAllOrders: builder.query<IResponse<IOrder[]>, IOrderQuery>({
      query: (params = {}) => ({
        url: "/orders",
        method: "GET",
        params,
      }),
      providesTags: ["ORDER"],
    }),

    // Update order status (Admin only)
    updateOrderStatus: builder.mutation<IResponse<IOrder>, { id: string; data: IUpdateOrderStatusRequest }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByNumberQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;