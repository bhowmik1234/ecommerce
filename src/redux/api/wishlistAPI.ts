import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DeleteWishListResponse, MessageResponse, NewWishListResponse, WishListResponse } from "../../types/api-types";

export const wishlistAPI = createApi({
    reducerPath: "wishlistApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/wishlist/`,
    }),
    tagTypes: ["wish"],
    endpoints: (builder) => ({
        addWishList: builder.mutation<MessageResponse, NewWishListResponse>({
            query: ({userId, productId}) => `${productId}?id=${userId}`,
            invalidatesTags: ["wish"]

        }),
        myWishList: builder.query<WishListResponse, string>({
            query: (id) => `my?id=${id}`,
            providesTags: ["wish"],
            // keepUnusedDataFor: 0
        }),
        deleteWishList: builder.mutation<MessageResponse, DeleteWishListResponse>({
            query: ({userId, productId}) => ({
                url: `delete/${productId}?id=${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["wish"],
            
        }),
    }),
});

export const { 
    useAddWishListMutation,
    useMyWishListQuery,
    useDeleteWishListMutation
} = wishlistAPI;