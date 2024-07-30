
// import toast from "react-hot-toast";
// import ProductCart from "../components/ProductCart"; // Make sure this path is correct
// import { CartItem } from "../types/types";
// import { addToCart } from "../redux/reducer/cartReducer";
// import { useDispatch } from "react-redux";

// const data = {
//     products: [
//       {
//         _id: '1',
//         name: 'Product 1',
//         price: 100,
//         stock: 10,
//         photo: 'https://via.placeholder.com/150'
//       },
//       {
//         _id: '2',
//         name: 'Product 2',
//         price: 200,
//         stock: 5,
//         photo: 'https://via.placeholder.com/150'
//       },
//       {
//         _id: '3',
//         name: 'Product 3',
//         price: 300,
//         stock: 0,
//         photo: 'https://via.placeholder.com/150'
//       }
//     ]
//   };

// const WishList = () => {
//   // Dummy data
//     const dispatch = useDispatch();

//   // Dummy addToCartHandler function
//   const addToCartHandler = (cartItem: CartItem) => {
//     if (cartItem.stock < 1) {
//       return toast.error("out of stock");
//     }
//     dispatch(addToCart(cartItem));
//     toast.success("added to cart");
//   }
//   return (
//     <div >
//       {data?.products.map((i) => (
//         <ProductCart
//           key={i._id}
//           productId={i._id}
//           name={i.name}
//           price={i.price}
//           stock={i.stock}
//           handler={addToCartHandler}
//           photo={i.photo}
//         />
//       ))}
//     </div>
//   );
// };

// export default WishList;


// import React from 'react';
import toast from 'react-hot-toast';
// import ProductCart from '../components/ProductCart'; // Ensure this path is correct
import { CartItem } from '../types/types';
import { addToCart } from '../redux/reducer/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import ProductCart from '../components/ProductCart';
import { useMyWishListQuery } from '../redux/api/wishlistAPI';
import { RootState } from '../redux/store';
import { CustomError } from '../types/api-types';
import { Skeleton } from '../components/Loader';


const WishList = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { data: wishListData, isLoading, isError, error } = useMyWishListQuery(user?._id!);

    if (isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
    }

    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) {
            return toast.error('Out of stock');
        }
        dispatch(addToCart(cartItem));
        toast.success('Added to cart');
    };

    return (
        <div className="wishlist-container">
            { isLoading ? <Skeleton width='50vw' /> :
                wishListData?.WishList.map((i) => (
                    <ProductCart
                        key={i._id}
                        productId={i._id}
                        // description={""}
                        name={i.name}
                        price={i.price}
                        stock={i.stock}
                        handler={addToCartHandler}
                        photo={i.photo}
                    />
                ))}
        </div>
    );
};

export default WishList;
