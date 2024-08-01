import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser, FaHeart, FaUserCog, FaClipboardList } from "react-icons/fa"
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Logo from "../assets/logo-transparent-png.png"

interface PropsTypes {
  user: User | null
}

const Header = ({ user }: PropsTypes) => {

  const { user: userProfle } = useSelector((state: RootState) => state.userReducer);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("logout")
      setIsOpen(false);
    } catch (error) {
      toast.error("sign out failed.")
    }
  }

  const toSearchHandler = () => {
    if (input === '') return navigate(`/search/product`);
    return navigate(`/search/${input}`);

  }
  return (
    <nav className="header">
      <div className="logo">
        <Link onClick={() => { setIsOpen(false) }} to="/">
          <img src={Logo} alt="ebag" />
        </Link>
      </div>
      <div className="search-box" >
        <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search" />
        <button onClick={toSearchHandler}><FaSearch /> </button>
      </div>

      <div className="nav-items">
        <Link onClick={() => { setIsOpen(false) }} to={"/wishlist"}><FaHeart /></Link>
        {/* <Link onClick={()=>{setIsOpen(false)}} to={"/search"}><FaSearch/></Link> */}
        <Link onClick={() => { setIsOpen(false) }} to={"/cart"}><FaShoppingBag /></Link>

        {
          user?._id ? (
            <>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <img src={userProfle?.photo} alt="User" />
              </button>
              <dialog open={isOpen} className="user-menu">
                <div onClick={()=> setIsOpen(false)}className="user-menu__content">
                  {user.role === "admin" && (
                    <Link to="/admin/dashboard" className="user-menu__item">
                      <FaUserCog className="user-menu__icon" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link to="/orders" className="user-menu__item">
                    <FaClipboardList className="user-menu__icon" />
                    <span>My Orders</span>
                  </Link>
                  <Link to="/profile" className="user-menu__item">
                    <FaUser className="user-menu__icon" />
                    <span>Profile</span>
                  </Link>
                  <button onClick={logoutHandler} className="user-menu__item user-menu__logout">
                    <FaSignOutAlt className="user-menu__icon" />
                    <span>Logout</span>
                  </button>
                </div>
              </dialog>
            </>
          ) :
            <Link to={"/login"}>
              <FaSignInAlt />
            </Link>
        }
      </div>

    </nav>
  )
}

export default Header