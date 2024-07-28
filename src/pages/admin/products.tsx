import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { userReducerIntialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Products = () => {

  const { user } = useSelector((state:{userReducer: userReducerIntialState})=> state.userReducer)

  const { data, isError, isLoading, error } = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  useEffect(()=>{
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${import.meta.env.VITE_SERVER}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      {/* <AdminSidebar /> */}
      <main>{isLoading ? <Skeleton width="50vw" length={25} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
      <AdminSidebar />

    </div>
  );
};

export default Products;
