import { Link } from "react-router-dom"
import ProductCart from "../components/ProductCart";

export const Home = () => {
  const addToCartHandler = () =>{}
  return (
    <div className="home">
      <section></section>

      <h1>Latest Product
        <Link to="/product" className="finemore">
          More
        </Link>
      </h1>
      <main>
        <ProductCart 
        productId={""} 
        photo={"https://c.media-amazon.com/images/I/61vtLhO6fDL._SY879_.jpg"} 
        name={"macbook"} 
        price={100000} 
        stock={10} 
        handler={addToCartHandler} />
      </main>

    </div>
  )
}

export default Home;