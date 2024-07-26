import { FaPlus } from "react-icons/fa"
import { CartItem } from "../types/types"
import { useState } from "react";

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

  return (
    <div className="productCart">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
      <span>${price}</span>
      <p>{name}</p>

      <div>
        <button onClick={()=>handler({productId, photo, name, price, stock, quantity:1})}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default ProductCart