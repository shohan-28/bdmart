import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Feature/ProductSlice";
import CartReducer from "../Feature/CartSlice";


export const store = configureStore({
    reducer: {
        product: ProductReducer,
        cart: CartReducer,
    },
});