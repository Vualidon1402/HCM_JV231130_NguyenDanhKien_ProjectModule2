import { RootState } from "./slices/index";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryReducer, categoryAction } from "./slices/category.slice";
import { authenReducer, authenActions } from "./slices/authen.slice";
import { productReducer } from "./slices/product.slice";
import { UserDataReducer } from "./slices/user.slice";

const RootReducer = combineReducers({
  productStore: productReducer,
  categoryStore: categoryReducer,
  authenStore: authenReducer,
  UserDataReducer: UserDataReducer,
});
const store = configureStore({
  reducer: RootReducer,
});

store.dispatch(categoryAction.findAll());
store.dispatch(authenActions.findAll());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
