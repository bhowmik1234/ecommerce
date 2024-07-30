import { useState, useEffect } from "react";
import { VscCheck, VscError } from "react-icons/vsc";
import CartItemCard from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer)

  const [couponCode, setCouponcode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponcode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) {
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  }
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) {
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  }
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  }

  const applyCoupon = () => {

    const { token, cancel } = axios.CancelToken.source();

    const timeId = setTimeout(async () => {
      await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/payement/discount?coupon=${couponCode}`, {
        cancelToken: token,
      })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          dispatch(calculatePrice());
          setIsValidCouponcode(true)
        })
        .catch(() => {
          dispatch(discountApplied(0));
          dispatch(calculatePrice());
          setIsValidCouponcode(false);
        })
    }, 1000)

    return () => {
      clearTimeout(timeId);
      cancel();
      setIsValidCouponcode(false);
    }

  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems])


  return (
    <div className="cart">
      <main>

        {
          cartItems.length > 0 ? (cartItems.map((i, index) => (
            <CartItemCard
              key={index}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />

          ))
          ) : (<h1>No item added</h1>)
        }
      </main>

      <aside className="checkout-summary">
        <h2>Order Summary</h2>
        <div className="checkout-summary__details">
          <div className="checkout-summary__row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-summary__row">
            <span>Shipping Charges:</span>
            <span>${shippingCharges.toFixed(2)}</span>
          </div>
          <div className="checkout-summary__row">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="checkout-summary__row checkout-summary__discount">
            <span>Discount:</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
          <div className="checkout-summary__row checkout-summary__total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="checkout-summary__coupon">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponcode(e.target.value)}
          />
          <button onClick={applyCoupon}>Apply</button>
        </div>

        {couponCode && (
          <div className={`checkout-summary__coupon-status ${isValidCouponCode ? 'green' : 'red'}`}>
            {isValidCouponCode ? (
              <>
                <VscCheck /> ${discount} off using <code>{couponCode}</code>
              </>
            ) : (
              <>
                <VscError /> Invalid coupon
              </>
            )}
          </div>
        )}

        {cartItems.length > 0 && (
          <Link to="/shipping" className="checkout-summary__checkout-btn">
            Proceed to Checkout
          </Link>
        )}
      </aside>
    </div>
  );
};

export default Cart;
