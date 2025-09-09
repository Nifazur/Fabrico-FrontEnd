import { baseApi } from "../baseApi";
import type { 
  IResponse, 
  IProduct, 
  IProductQuery, 
  ICreateProductRequest 
} from "../../types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products (Public)
    getAllProducts: builder.query<IResponse<IProduct[]>, IProductQuery>({
      query: (params = {}) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["PRODUCT"],
    }),

    // Get single product by slug (Public)
    getProductBySlug: builder.query<IResponse<IProduct>, string>({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "GET",
      }),
      providesTags: ["PRODUCT"],
    }),

    // Create product (Admin only)
    createProduct: builder.mutation<IResponse<IProduct>, ICreateProductRequest>({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        data: productData,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    // Update product (Admin only)
    updateProduct: builder.mutation<IResponse<IProduct>, { slug: string; data: Partial<ICreateProductRequest> }>({
      query: ({ slug, data }) => ({
        url: `/products/${slug}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    // Delete product (Admin only) - Soft delete
    deleteProduct: builder.mutation<IResponse<IProduct>, string>({
      query: (slug) => ({
        url: `/products/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;