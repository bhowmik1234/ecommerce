import { FaPlus } from "react-icons/fa"

type ProductProps = {
productId: string,
photo: string,
name: string,
price: number,
stock: number,
handler:()=>void
}
const server = "dfasdfadf";
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
      <img src={photo} alt={name} />
      <span>${price}</span>
      <p>{name}</p>

      <div>
        <button onClick={()=>handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default ProductCart