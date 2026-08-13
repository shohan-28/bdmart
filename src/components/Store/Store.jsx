import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Feature/ProductSlice";
import CartReducer from "../Feature/CartSlice";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
console.log("Storage:", storage);
const rootReducer = combineReducers({
  product: ProductReducer,
  cart: CartReducer,
});

const persistConfig = {
  key: "root",
  storage: storage.default ?? storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      
    }),


});

export const persistor = persistStore(store);