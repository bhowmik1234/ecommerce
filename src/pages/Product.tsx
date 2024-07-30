// Product.tsx
import React, { useRef, useState } from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useLatestProductsQuery, useProdectDetailsQuery } from '../redux/api/productAPI';
import toast from 'react-hot-toast';
import ProductCart from '../components/ProductCart';
import { Skeleton } from '../components/Loader';
import { CartItem } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartReducer';
import { useParams } from 'react-router-dom';


const Product = () => {
    const { data, isLoading, isError } = useLatestProductsQuery("");
    const { id } = useParams();
    const { data: productData, isLoading: productLoaing, isError: productisError } = useProdectDetailsQuery(id!);

    if (isError) toast.error("cannot fetch the product.");
    if (productisError) toast.error("cannot fetch the product.");

    const productSliderRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const scrollProducts = (direction: 'left' | 'right') => {
        if (productSliderRef.current) {
            const { current } = productSliderRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const addToCartHandler = (cartItem: CartItem) => {
        if (cartItem.stock < 1) {
            return toast.error("out of stock");
        }
        dispatch(addToCart(cartItem)!);
        toast.success("added to cart");
    }


  
    const description = "sdfasfd";
    const fullDescription = "sdfasfd";
    const rating = 3;

    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= productData?.product.stock!) {
            setQuantity(value);
        }
    };

    const addToaCart = () => {
        const cartItem: CartItem = {
        productId: productData?.product._id!,
        photo: productData?.product.photo!,
        name: productData?.product.name!,
        price: productData?.product.price!,
        quantity: quantity!,
        stock: productData?.product.stock!
        };
        dispatch(addToCart(cartItem));
        toast.success("added to cart.");
        console.log(`Added ${quantity} ${name}(s) to cart`);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="product">


        {
            productLoaing ? <Skeleton width="50vw" /> :
            (
                <>
                            <section className="product__main">
                <div className="product__image-container">
                    <img src={`${import.meta.env.VITE_SERVER}/${productData?.product.photo}`} alt={productData?.product.name} className="product__image" />
                </div>
                <div className="product__info">
                    <h1 className="product__name">{productData?.product.name}</h1>
                    <p className="product_short_description">{description}</p>
                    <p className="product__price">${productData?.product.price}</p>
                    <div className="product__rating">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={index < rating ? 'star-filled' : 'star-empty'}
                            />
                        ))}
                        <span>({rating.toFixed(1)})</span>
                    </div>
                    <p className="product__stock" >
                        In stock: <span style={{color: (productData?.product.stock! > 0 ?"green" : "red")}}>{productData?.product.stock}</span>
                    </p>
                    <div className="product__actions">
                        <div className="product__quantity">
                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={productData?.product.stock}
                            />
                        </div>
                        <button className="product__add-to-cart" onClick={addToaCart}>
                            <FaShoppingCart /> Add to Cart
                        </button>
                        <button
                            className={`product__favorite ${isFavorite ? 'favorite-active' : ''}`}
                            onClick={toggleFavorite}
                        >
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </section>
                </>
            )
        }




            <section className="product__description">
                <h2>Product Description</h2>
                <p>{fullDescription}</p>
            </section>
            <section className="product__related">
                <h2>Related Products</h2>
                {/* Add related products component here */}
                <div className="product-slider-container">
                    <button className="slider-button left" onClick={() => scrollProducts('left')}>&lt;</button>
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
            </section>
        </div>
    );
};

export default Product;