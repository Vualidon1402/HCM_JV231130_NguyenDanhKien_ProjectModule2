import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  data: Category[];
}

const initialState: CategoryState = {
  data: [],
};

const findAll = createAsyncThunk<Category[]>("category/findAll", async () => {
  const res = await axios.get<Category[]>("http://localhost:3001/categories");
  return res.data;
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Category[]>) => {
      state.data = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.data.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      state.data = state.data.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.data = state.data.map((student) => {
        if (student.id === action.payload.id) {
          return action.payload;
        }
        return student;
      });
    },
    resetForm: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findAll.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryAction = {
  ...categorySlice.actions,
  findAll,
};
