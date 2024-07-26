import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userReducerIntialState } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState: userReducerIntialState = {
    user: null,
    loading: true
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExits: (state, action: PayloadAction<User>) =>{
            state.loading = false;
            state.user = action.payload;
        },
        userNotExits: (state) =>{
            state.loading = false;
            state.user = null;
        }
    }
})

export const { userExits, userNotExits } = userReducer.actions;