
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { useDispatch } from "react-redux";
import { userExits, userNotExits } from "../redux/reducer/userReducer";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const [login] = useLoginMutation();

    const loginHandler = async () =>{
      try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);

        console.log({
          name: user.displayName!,
          email: user.email!,
          photo: user.photoURL!,
          gender,
          role: "user",
          dob: date,
          _id: user.uid,
        });

        const res = await login({
          name: user.displayName!,
          email: user.email!,
          photo: user.photoURL!,
          gender,
          role: "user",
          dob: date,
          _id: user.uid
        });

        if(res.data){
          toast.success(res.data.message);
          const data = await getUser(user.uid);
          // console.log(data);
          dispatch(userExits(data?.user!));
        }
        else{
          const error = res.error as FetchBaseQueryError
          const message = error.data as MessageResponse;
          toast.error(message.message);
          dispatch(userNotExits());

        }
      } catch (error) {
        console.log(error);
        toast.error('Sign in fail.');
      }
    }

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login