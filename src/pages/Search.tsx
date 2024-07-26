
import { useState } from "react";
import ProductCart from "../components/ProductCart";
import { useCategoriesQuery, useSeatchProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { data:CategoriesResponse, isLoading: isLoadingCategories, isError, error} = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {data: SearchedData, isLoading: SearchDataLoading, isError: SearchisError, error: SearchError} = useSeatchProductsQuery({search, sort, category, page, price:maxPrice});

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if(SearchisError){
    const err = SearchError as CustomError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) =>{
    if(cartItem.stock < 1){
      return toast.error("out of stock");
    }
    dispatch(addToCart(cartItem));
    toast.success("added to cart");
  }

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {
              !isLoadingCategories && CategoriesResponse?.categories.map((i, ind)=>(
                <option key={ind} value={`${i}`}>{i}</option>
              ))
            }
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

          {
            SearchDataLoading ? <Skeleton width="50vw" /> :
            (
              <div className="search-product-list">
            {
              SearchedData?.products.map((i)=>(
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
            }
          </div>
            )
          }
          {
            SearchedData && SearchedData.totalPage > 1 &&
            <article>
              <button
                disabled={!isPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </button>
              <span>
                {page} of {SearchedData.totalPage}
              </span>
              <button
                disabled={!isNextPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </article>
          }
      </main>
    </div>
  );
};

export default Search;
