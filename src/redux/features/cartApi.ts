import { baseApi } from "../baseApi";
import type { 
  IResponse, 
  ICart, 
  IAddToCartRequest, 
  IUpdateCartItemRequest 
} from "../../types";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user's cart
    getCart: builder.query<IResponse<ICart>, void>({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["CART"],
    }),

    // Add item to cart
    addToCart: builder.mutation<IResponse<ICart>, IAddToCartRequest>({
      query: (itemData) => ({
        url: "/cart/items",
        method: "POST",
        data: itemData,
      }),
      invalidatesTags: ["CART"],
    }),

    // Update cart item quantity
    updateCartItem: builder.mutation<IResponse<ICart>, { itemId: string; data: IUpdateCartItemRequest }>({
      query: ({ itemId, data }) => ({
        url: `/cart/items/${itemId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CART"],
    }),

    // Remove item from cart
    removeFromCart: builder.mutation<IResponse<ICart>, string>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),

    // Clear entire cart
    clearCart: builder.mutation<IResponse<ICart>, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;