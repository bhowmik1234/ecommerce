import { useRef } from 'react';
import ProductCart from "../components/ProductCart";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import Slider from "../components/Slider";

const brands: Record<string, string>[] = [
  {
    logo: "https://www.citypng.com/public/uploads/preview/hd-white-nike-logo-transparent-png-701751694777170hrodp6c2ek.png?v=2024070814",
    name: "Nike",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAT4BdeCYQ5yZCLfiua53FH69Q-61Jt1ys3A&s",
    name: "Adidas",
  },
  {
    logo: "https://www.citypng.com/public/uploads/preview/zara-white-logo-download-png-701751694774624x2rs5hk3ea.png",
    name: "Zara",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png",
    name: "H&M",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/2560px-UNIQLO_logo.svg.png",
    name: "Uniqlo",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/2560px-Levi%27s_logo.svg.png",
    name: "Levi's",
  },
];




const images: string[] = [
  "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Tablet/Samsung/July/Samsung-Galaxy-S6-Lite_1500-x-300.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/July/TBS/Updated/Lux-perfumes-for-men-PCgh._CB567481362_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/Meghana/iQOO/Z9LiteBau/V2/D147682074_WLD_BAU_iQOO-Z9-Lite-5G_DesktopTall_Hero_3000x1200V2._CB569330392_.jpg",
];

export const Home = () => {
  const dispatch = useDispatch();
  const productSliderRef = useRef<HTMLDivElement>(null);
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) {
      return toast.error("out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success("added to cart");
  }

  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) toast.error("cannot fetch the product.");

  const scrollProducts = (direction: 'left' | 'right') => {
    if (productSliderRef.current) {
      const { current } = productSliderRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  return (
    <div className="home">
      <div className="items">
        <ul>
          <li>Home</li>
          <li>Category</li>
          <li>Mens</li>
          <li>Womes</li>
          <li>Jwellery</li>
          <li>Offer</li>
        </ul>
      </div>
      <section>
        <Slider images={images} />
      </section>

      <main>
        <div className="brands">
          {brands.map((brand, index) => (
            <div key={index} className="brand">
              <img src={brand.logo} alt={brand.name} className="logo" />
              <span className="name">{brand.name}</span>
            </div>
          ))}
        </div>
        {/*  latest products */}
        <div className="product-slider-container">
          <button className="slider-button left" onClick={() => scrollProducts('left')}>&lt;</button>
            <h1>Latest Products</h1>
          <div className="product-slider" ref={productSliderRef}>
            {isLoading ? (
              <Skeleton width="80vw" />
            ) : (
              data?.products.map((i) => (
                <ProductCart
                  key={i._id}
                  productId={i._id}
                  // description={""}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))
            )}
          </div>
          <button className="slider-button right" onClick={() => scrollProducts('right')}>&gt;</button>
        </div>

        {/* Trends */}
        <div className="product-slider-container">
          <button className="slider-button left" onClick={() => scrollProducts('left')}>&lt;</button>
            <h1>Offers</h1>
          <div className="product-slider" ref={productSliderRef}>
            {isLoading ? (
              <Skeleton width="80vw" />
            ) : (
              data?.products.map((i) => (
                <ProductCart
                  key={i._id}
                  productId={i._id}
                  // description={""}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))
            )}
          </div>
          <button className="slider-button right" onClick={() => scrollProducts('right')}>&gt;</button>
        </div>

        {/* offer of the day */}
        <div className="product-slider-container">
          <button className="slider-button left" onClick={() => scrollProducts('left')}>&lt;</button>
            <h1>Latest Products</h1>
          <div className="product-slider" ref={productSliderRef}>
            {isLoading ? (
              <Skeleton width="80vw" />
            ) : (
              data?.products.map((i) => (
                <ProductCart
                  key={i._id}
                  productId={i._id}
                  // description={""}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))
            )}
          </div>
          <button className="slider-button right" onClick={() => scrollProducts('right')}>&gt;</button>
        </div>

      </main>

      <div className='collection'>
        <div className='collection-item'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBe_hpfvNOHo15lP7jWgQcyNSWVi273MIdA&s" alt="Collection Item 1" />
          <div className='item-name'>Summer Vibes</div>
        </div>
        <div className='collection-item'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ5YJ3deLDkjqIp1GVo4bGfopqcqhgv2B0A&s" />
          <div className='item-name'>Urban Chic</div>
        </div>
        <div className='collection-item'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuunyH0QBMTXmXufpLj_D4RlPeZoSl091PA&s" alt="Collection Item 3" />
          <div className='item-name'>Cozy Autumn</div>
        </div>
        <div className='collection-item'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM8Wn44pnGl2oIjQsZ9-T1zPALQBvgUHLvyw&s" alt="Collection Item 4" />
          <div className='item-name'>Winter Warmth</div>
        </div>
        <div className='collection-item'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJMD0I_d1_FtM9oSCHEj80C5yFlW_6hehF3A&s" alt="Collection Item 5" />
          <div className='item-name'>Spring Bloom</div>
        </div>
        <div className='collection-item'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTHvDGdTo_yFqIIlh-Qn0fL0xk1u_Tc0mCA&s" alt="Collection Item 6" />
          <div className='item-name'>Elegant Evening</div>
        </div>
      </div>
    </div>
  )
}

export default Home;