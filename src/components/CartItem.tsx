import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
type CartItemProps = {
    cartItem: any,
}

const CartItem = ({cartItem}: CartItemProps) => {
   const { productId,photo, name, price, quantity } = cartItem;

   const decrementHandler = () =>{}
   const incrementHandler = () =>{}
   const removeHandler = () =>{}

  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler()}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler()}>+</button>
      </div>

      <button onClick={() => removeHandler()}>
        <FaTrash />
      </button>
    </div>
  )
}

export default CartItem