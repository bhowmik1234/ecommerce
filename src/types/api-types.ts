import { CartItem, Order, Product, ShippingInfo, User } from "./types";

export type CustomError = {
  status: number,
  data: {
    success: boolean,
    message: string,
  }
}

export type MessageResponse = {
    success: boolean;
    message: string;
  };

  export type UserResponse = {
    success: boolean;
    user: User
  };

  export type AllUsersResponse = {
    success: boolean;
    users: User[]
  };

  export type AllProductResponse = {
    success: boolean;
    products: Product[];
  }

  export type CategoriesResponse = {
    success: boolean;
    categories: string[];
  }

  export type SearchProductsResponse = AllProductResponse & {
    totalPage: number;
  };
  export type SearchProductsRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
  };

  export type ProductResponse = {
    success: boolean;
    product: Product;
  }

  export type MyOrdersResponse = {
    success: boolean;
    orders: Order[];
  }

  export type orderDetailsResponse = {
    success: boolean;
    order: Order;
  }

  export type NewProductRequest = {
    id: string;
    formData: FormData;
  };

  export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
  };

  export type DeleteProductRequest = {
    userId: string;
    productId: string;
  };


  export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    user: string;
  };

  export type UpdateOrderRequest = {
    userId: string,
    orderId: string
  };


  export type DeleteUserRequest = {
    userId: string,
    adminUserId: string
  }