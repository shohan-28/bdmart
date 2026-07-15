import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Feature/ProductSlice";


export const store = configureStore({
    reducer: {
        product: ProductReducer,
    },
});