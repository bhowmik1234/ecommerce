import { Link } from "react-router-dom"
import ProductCart from "../components/ProductCart";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

export const Home = () => {
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) =>{
    if(cartItem.stock < 1){
      return toast.error("out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success("added to cart");
  }

  const { data, isLoading, isError } = useLatestProductsQuery("");

  if(isError) toast.error("cannot fetch the product.");
  return (
    <div className="home">
      <section></section>

      <h1>Latest Product
        <Link to="/product" className="finemore">
          More
        </Link>
      </h1>
      <main>
       {isLoading ? <Skeleton width="80vw"/> :(
        data?.products.map((i) => (
          <ProductCart
            key={i._id}
            productId={i._id}
            name={i.name}
            price={i.price}
            stock={i.stock}
            handler={addToCartHandler}
            photo={i.photo}
          />
        ))
      )
       }
      </main>

    </div>
  )
}

export default Home;