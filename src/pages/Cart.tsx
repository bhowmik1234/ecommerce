import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";


const cartitem = [
  {
    productId: "sdfa",
    photo:"https://c.media-amazon.com/images/I/71an9eiBxpL._AC_SR360,240_QL69_.jpg",
    name:"macbook",
    price:100000,
    quantity:4,
    stock:10
  }
];
const Cart = () => {
  const [couponCode, setCouponcode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponcode] = useState<boolean>(false);

  useEffect(()=>{

    const timeId = setTimeout(()=>{
      if(Math.random() > 0.5 ) setIsValidCouponcode(true);
      else setIsValidCouponcode(false);
    }, 1000)

    return ()=>{
      clearTimeout(timeId);
      setIsValidCouponcode(false);
    }

  },[couponCode]);

  return (
    <div className="cart">
      <main>

        {
          cartitem.length > 0 ? (cartitem.map((i, index)=>( <CartItem key={index} cartItem={i}/> ))
        ): (<h1>No item added</h1>)
        }
      </main>
      <aside>
        <p>Subtotal: 45455</p>
        <p>Shipping Charges: 34543</p>
        <p>Tax: 453</p>
        <p>
          Discount: <em> - 45345</em>
        </p>
        <p>
          <b>Total: 4534</b>
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
            cartitem.length > 0 && (
              <Link to="/shipping">checkout</Link>
            )
          }
      </aside>
    </div>
  );
};

export default Cart;
