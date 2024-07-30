import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaFlag } from 'react-icons/fa';
import { MdLocalPostOffice } from 'react-icons/md';
import { CartReducerInitialState } from "../types/reducer-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state:{cartReducer: CartReducerInitialState})=> state.cartReducer);

  useEffect(()=>{
    if(cartItems.length <= 0){
      navigate("/cart");
    }
  }, [cartItems])

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/payement/create`, 
        {amount: total},
        {headers: {"Content-Type": "application/json"}}
      )
      navigate("/pay", {state: data.clientSecret,})
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
    }
  };


  return (
    // <div className="shipping">
    //   <button className="back-btn">
    //     <BiArrowBack />
    //   </button>

    //   <form onSubmit={submitHandler}>
    //     <h1>Shipping Address</h1>

    //     <input
    //       required
    //       type="text"
    //       placeholder="Address"
    //       name="address"
    //       value={shippingInfo.address}
    //       onChange={changeHandler}
    //     />

    //     <input
    //       required
    //       type="text"
    //       placeholder="City"
    //       name="city"
    //       value={shippingInfo.city}
    //       onChange={changeHandler}
    //     />

    //     <input
    //       required
    //       type="text"
    //       placeholder="State"
    //       name="state"
    //       value={shippingInfo.state}
    //       onChange={changeHandler}
    //     />

    //     <select
    //       name="country"
    //       required
    //       value={shippingInfo.country}
    //       onChange={changeHandler}
    //     >
    //       <option value="">Choose Country</option>
    //       <option value="india">India</option>
    //     </select>

    //     <input
    //       required
    //       type="number"
    //       placeholder="Pin Code"
    //       name="pinCode"
    //       value={shippingInfo.pinCode}
    //       onChange={changeHandler}
    //     />

    //     <button type="submit">Pay Now</button>
    //   </form>
    // </div>
    <div className="shipping-container">
      <button className="back-btn" onClick={() => window.history.back()}>
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler} className="shipping-form">
        <h1>Shipping Address</h1>
        <p>Please enter your shipping details</p>

        <div className="form-group">
          <FaMapMarkerAlt className="input-icon" />
          <input
            required
            type="text"
            placeholder="Address"
            name="address"
            value={shippingInfo.address}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <FaCity className="input-icon" />
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            value={shippingInfo.city}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <FaFlag className="input-icon" />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            value={shippingInfo.state}
            onChange={changeHandler}
          />
        </div>

        <div className="form-group">
          <FaGlobeAmericas className="input-icon" />
          <select
            name="country"
            required
            value={shippingInfo.country}
            onChange={changeHandler}
          >
            <option value="">Choose Country</option>
            <option value="india">India</option>
            <option value="usa">United States</option>
            <option value="uk">United Kingdom</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="form-group">
          <MdLocalPostOffice className="input-icon" />
          <input
            required
            type="number"
            placeholder="Pin Code"
            name="pinCode"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
          />
        </div>

        <button type="submit" className="submit-btn">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Shipping;