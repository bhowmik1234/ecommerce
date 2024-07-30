import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userExits, userNotExits } from "./redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userAPI";
// import { UserResponse } from "./types/api-types";
import { userReducerIntialState } from "./types/reducer-types";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import WishList from "./pages/WishList";


const Home = lazy(()=> import("./pages/Home"));
const Cart = lazy(()=> import("./pages/Cart"));
const Search = lazy(()=> import("./pages/Search"));
const Shipping = lazy(()=> import("./pages/Shipping"));
const Orders = lazy(()=> import("./pages/Orders"));
const OrderDetails = lazy(()=> import("./pages/OrderDetails"));
const Checkout = lazy(()=> import("./pages/Checkout"));
const ProductPage = lazy(() => import("./pages/Product"));



const Login = lazy(()=> import("./pages/Login"));



// admin routes
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

export const App = () => {
  const { user, loading} = useSelector((state:{userReducer: userReducerIntialState})=> state.userReducer)
  const dispatch = useDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        const data = await getUser(user.uid);
        console.log(data.user);
        dispatch(userExits(data.user))
      }
      else{
        dispatch(userNotExits());
        console.log("not logged IN.")
      }
    })
  }, [])
  return loading ? <Loader /> :
  (
    <Router>
      <Header user={user}/>
      <Suspense fallback={<Loader />}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search/:id" element={<Search />} />

        {/* not login route */}
        <Route path="/login" element={
          <ProtectedRoute isAuthenticated={user? false : true}>
          <Login />
        </ProtectedRoute>} />
        

        {/* loggin user route */}
        <Route element={<ProtectedRoute isAuthenticated={user? true : false}/>}>
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/pay" element={<Checkout />} />
        </Route>



        {/* admin routes */}
          <Route
            element={
              <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin"?true:false} />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            {/* <Route path="/admin/app/stopwatch" element={<Stopwatch />} /> */}
            {/* <Route path="/admin/app/toss" element={<Toss />} /> */}

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>
          ;
        </Routes>
      </Suspense>
      <Footer />
      <Toaster position="top-center" />
    </Router>
  )
}
