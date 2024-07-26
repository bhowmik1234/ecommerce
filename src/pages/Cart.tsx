import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, subtotal, tax, total, shippingCharges, discount} = useSelector((state:{cartReducer: CartReducerInitialState})=> state.cartReducer)

  const [couponCode, setCouponcode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponcode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) =>{
    if(cartItem.quantity >= cartItem.stock){
      return;
    }
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity + 1}));
  }
  const decrementHandler = (cartItem: CartItem) =>{
    if(cartItem.quantity <= 1){
      return;
    }
    dispatch(addToCart({...cartItem, quantity: cartItem.quantity - 1}));
  }
  const removeHandler = (productId: string) =>{
    dispatch(removeCartItem(productId));
  }

  useEffect(()=>{

    const { token, cancel } = axios.CancelToken.source();

    const timeId = setTimeout(async ()=>{
      await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/payement/discount?coupon=${couponCode}`, {
        cancelToken: token,
      })
      .then((res)=>{
        dispatch(discountApplied(res.data.discount));
        dispatch(calculatePrice());
        setIsValidCouponcode(true)
      })
      .catch(()=>{
        dispatch(discountApplied(0));
        dispatch(calculatePrice());
        setIsValidCouponcode(false);
      })
    }, 1000)

    return ()=>{
      clearTimeout(timeId);
      cancel();
      setIsValidCouponcode(false);
    }

  },[couponCode]);

  useEffect(()=>{
    dispatch(calculatePrice());
  },[cartItems])

  return (
    <div className="cart">
      <main>

        {
          cartItems.length > 0 ? (cartItems.map((i, index)=>( 
            <CartItemCard 
              key={index} 
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            /> 
        
        ))
        ): (<h1>No item added</h1>)
        }
      </main>
      <aside>
        <p>Subtotal: {subtotal}</p>
        <p>Shipping Charges: {shippingCharges}</p>
        <p>Tax: {tax}</p>
        <p>
          Discount: <em> - {discount}</em>
        </p>
        <p>
          <b>Total: {total}</b>
        </p>
        <input
          type="text"
          placeholder="coupon code"
          onChange={(e) => setCouponcode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              43535 of using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid coupon <VscError />
            </span>
          ))}

          {
            cartItems.length > 0 && (
              <Link to="/shipping">checkout</Link>
            )
          }
      </aside>
    </div>
  );
};

export default Cart;
