import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Authen {
  id: number;
  email: string;
  password: string;
  role: string;
  cart: string[];
}

const initialState: Authen = {
  id: 0,
  email: "",
  password: "",
  role: "",
  cart: [],
};

const findAll = createAsyncThunk<Authen[]>("authen/findAll", async () => {
  const res = await axios.get<Authen[]>("http://localhost:3001/authen");
  return res.data;
});

const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Authen>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.cart = action.payload.cart;
    },
    resetForm: () => {
      return initialState;
    },
    loginSuccess: (state) => {
      state.cart = [];
    },
    addToCart: (state, action: PayloadAction<string>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      findAll.fulfilled,
      (state, action: PayloadAction<Authen[]>) => {
        // Assuming you want to set the first user data from the response
        if (action.payload.length > 0) {
          state.id = action.payload[0].id;
          state.email = action.payload[0].email;
          state.password = action.payload[0].password;
          state.role = action.payload[0].role;
          state.cart = action.payload[0].cart;
        }
      }
    );
  },
});

export const authenActions = { ...authenSlice.actions, findAll };
export const authenReducer = authenSlice.reducer;
