import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { useState } from "react";

const user = {_id:"user1", role:""};

const Header = () => {

  const [isOpen, setIsOpen ] = useState<boolean>(false);

  const logoutHandler = ()=>{
    setIsOpen(false);
  }
  return (
    <nav className="header">
      <Link onClick={()=>{setIsOpen(false)}} to="/">Home</Link>
      <Link onClick={()=>{setIsOpen(false)}} to={"/search"}><FaSearch/></Link>
      <Link onClick={()=>{setIsOpen(false)}} to={"/cart"}><FaShoppingBag /></Link>

      {
        user?._id ? (
          <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {
                user.role === "admin" && (
                  <Link to="/admin/dashboard">

                  </Link>
                )
              }
              <Link to="/orders">orders</Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
          </>
        ) :
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      }

    </nav>
  )
}

export default Header