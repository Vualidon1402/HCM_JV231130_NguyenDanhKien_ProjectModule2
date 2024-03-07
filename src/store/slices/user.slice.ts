import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../apis/user.api";

export interface User {
  name: string;
  email: string;
  password: string;
  cart: any[];
}
interface UserStatus {
  data: User | null;
  cart: any[];
}

const initialState: UserStatus = {
  data: null,
  cart: [],
};

export const UserDataSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      // console.log("state.data",state.data);
    },
    setCart: (state, action) => {
      state.data.cart = [...action.payload];
    },
  },
});

export const UserDataReducer = UserDataSlice.reducer;
export const UserDataAction = UserDataSlice.actions;
