import { FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Order, OrderItem } from "../../../types/types";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import { useSelector } from "react-redux";
import { userReducerIntialState } from "../../../types/reducer-types";
import { Skeleton } from "../../../components/Loader";
import { ResponseToast } from "../../../utils/features";


const defaultData: Order = {
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
    },
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    user: { name: "", _id: "" },
    _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector((state:{userReducer: userReducerIntialState})=> state.userReducer);

    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, data, isError } = useOrderDetailsQuery(id!);

    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    const {
        shippingInfo: { address, city, state, country, pinCode },
        orderItems,
        user: { name },
        status,
        tax,
        subtotal,
        total,
        discount,
        shippingCharges,
    } = data?.order || defaultData;

    const updateHandler = async () => {
      const res = await updateOrder({
        userId: user?._id!,
        orderId: data?.order._id!
      });
      ResponseToast(res,navigate, "/admin/transaction");
    };

    const deleteHandler = async () => {
      const res = await deleteOrder({
        userId: user?._id!,
        orderId: data?.order._id!
      });
      ResponseToast(res,navigate, "/admin/transaction");
    };

    if (isError) return <Navigate to={"/404"} />;

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management">
                {
                  isLoading ? <Skeleton length={20} width="50vw" /> :
                  (
                    <>
                      <section
                    style={{
                        padding: "2rem",
                    }}
                >
                    <h2>Order Items</h2>

                    {orderItems.map((i) => (
                        <ProductCard
                            key={i._id}
                            name={i.name}
                            photo={`${import.meta.env.VITE_SERVER}/${i.photo}`}
                            productId={i.productId}
                            _id={i._id}
                            quantity={i.quantity}
                            price={i.price}
                        />
                    ))}
                </section>

                <article className="shipping-info-card">
                    <button
                        className="product-delete-btn"
                        onClick={deleteHandler}
                    >
                        <FaTrash />
                    </button>
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name: {name}</p>
                    <p>
                        Address:{" "}
                        {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                    </p>
                    <h5>Amount Info</h5>
                    <p>Subtotal: {subtotal}</p>
                    <p>Shipping Charges: {shippingCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>

                    <h5>Status Info</h5>
                    <p>
                        Status:{" "}
                        <span
                            className={
                                status === "Delivered"
                                    ? "purple"
                                    : status === "Shipped"
                                    ? "green"
                                    : "red"
                            }
                        >
                            {status}
                        </span>
                    </p>
                    <button className="shipping-btn" onClick={updateHandler}>
                        Process Status
                    </button>
                </article>
                    </>
                  )
                }
            </main>
        </div>
    );
};

const ProductCard = ({
    name,
    photo,
    price,
    quantity,
    productId,
}: OrderItem) => (
    <div className="transaction-product-card">
        <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>
            ₹{price} X {quantity} = ₹{price * quantity}
        </span>
    </div>
);

export default TransactionManagement;
