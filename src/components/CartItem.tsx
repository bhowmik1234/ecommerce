import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { CartItem } from "../types/types";
type CartItemProps = {
    cartItem: CartItem,
    incrementHandler: (cartItem: CartItem) => void,
    decrementHandler: (cartItem: CartItem) => void,
    removeHandler: (id: string) => void
}

const CartItemCard = ({cartItem, incrementHandler, decrementHandler, removeHandler}: CartItemProps) => {
   const { productId,photo, name, price, quantity } = cartItem;

  //  const decrementHandler = () =>{}
  //  const incrementHandler = () =>{}
  //  const removeHandler = () =>{}

  return (
    <div className="cart-item">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>

      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  )
}

export default CartItemCard