import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/types"
import { FaHeart } from 'react-icons/fa';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAddWishListMutation, useDeleteWishListMutation, useMyWishListQuery } from "../redux/api/wishlistAPI";
import toast from "react-hot-toast";
import WishList from "../pages/WishList";


type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
}
const ProductCart = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler
}: ProductProps) => {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data: wishListData, isLoading} = useMyWishListQuery(user?._id!);

  // useEffect(()=>{

  useEffect(() => {
    if (wishListData) {
      const found = wishListData.WishList.some(e => e._id === productId);
      if (found !== isWishlisted) {
        setIsWishlisted(true);
      }
    }
  }, [ isWishlisted]);
    

  // },[isWishlisted])


  const [addWishList] = useAddWishListMutation();
  const [deleteWishList] = useDeleteWishListMutation();

  const discount = 10;
  const rating = 5;
  const ratingCount = 10;
  
  const navigate = useNavigate();
  const productDetail = () =>{
    return navigate(`/product/${productId}`);
  }

  const handleWishlist = async (e: any) => {
    e.stopPropagation();
    try {
      if(!isWishlisted){
        await addWishList({userId: user?._id!, productId});
        toast.success("added to cart.");
        setIsWishlisted(true);
      }else{
        setIsWishlisted(false);
        await deleteWishList({userId: user?._id!, productId});
        toast.success("Removed from cart.");
      }
    } catch (error) {
      console.log(error);
    }
    

  };

  const addTocart = (e:any) =>{
    e.stopPropagation();
    handler({ productId, photo, name, price, stock, quantity: 1 });
  }

  return (
    <div className="productCart" onClick={productDetail}>
      <div className="imageWrapper">
        <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
        {discount && <span className="discount">{discount}% OFF</span>}
        <button 
          className={`wishlistBtn ${isWishlisted ? 'wishlisted' : ''}`} 
          onClick={handleWishlist}
        >
          <FaHeart />
        </button>
      </div>
      <div className="productInfo">
        <h3 className="name">{name}</h3>
        <span className="price">${price.toFixed(2)}</span>
        <div className="rating">
          <div className="stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
          <span className="count">({ratingCount})</span>
        </div>
      </div>
      <button
        className="addToCartBtn"
        onClick={addTocart}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCart
