import { CartItem } from "../types/types"

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

  const discount = 10;
  const rating = 5;
  const ratingCount = 10;


  return (
    <div className="productCart">
      <div className="imageWrapper">
        <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
        {discount && <span className="discount">{discount}% OFF</span>}
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
        onClick={() => handler({ productId, photo, name, price, stock, quantity: 1 })}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCart
