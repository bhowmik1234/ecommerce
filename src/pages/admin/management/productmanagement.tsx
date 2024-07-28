import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { userReducerIntialState } from "../../../types/reducer-types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDeleteProductMutation, useProdectDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productAPI";
import { Skeleton } from "../../../components/Loader";
import { ResponseToast } from "../../../utils/features";

const Productmanagement = () => {

  const { user } = useSelector((state: {userReducer: userReducerIntialState})=> state.userReducer );
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProdectDetailsQuery(params.id!);

  const { photo, name, category, stock, price } = data?.product || {
    photo:"",
    name: "",
    category: "",
    stock: 0,
    price: 0
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();


  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData;

    if (nameUpdate) formData.set("name", nameUpdate);
      // if (descriptionUpdate) formData.set("description", descriptionUpdate);
      if (priceUpdate) formData.set("price", priceUpdate.toString());
      if (stockUpdate !== undefined)
        formData.set("stock", stockUpdate.toString());

      if (categoryUpdate) formData.set("category", categoryUpdate);
      if (photoFile) formData.set("photo", photoFile );


      // if (photosFiles.file && photosFiles.file.length > 0) {
      //   photosFiles.file.forEach((file) => {
      //     formData.append("photos", file);
      //   });
      // }
      const res = await updateProduct({formData, userId: user?._id!, productId: data?.product._id!});

      ResponseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {

      const res = await deleteProduct({userId: user?._id!, productId: data?.product._id!});

      ResponseToast(res, navigate, "/admin/product");
  };

  useEffect(()=>{
    if(data){
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      // setPhotoFile(data.product.photo);

    }
  },[data])

  if(isError) return < Navigate to={"/404"}/>

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}
      <main className="product-management">
        {
          isLoading ? <Skeleton width="60vs" length={25} /> :
          (
            <>
              <section>
          <strong>ID - {data?.product._id}</strong>
          <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
            </>
          )
        }
      </main>
      <AdminSidebar />

    </div>
  );
};

export default Productmanagement;
