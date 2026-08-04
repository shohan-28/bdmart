import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeCart,
} from "../Feature/CartSlice";
import { useNavigate, useParams } from "react-router-dom";
import Checkout from "./../CheckOut/CheckOut";

const CartPage = () => {
  const ProductData = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = ProductData.find(
    (item) => Number(item.id) === Number(productId),
  );
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>

          <p className="text-gray-500 mt-2">Add some products to your cart.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-md"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>

                <p className="text-gray-500">{item.category}</p>

                <p className="font-bold mt-2">${item.price}</p>

                {/* Quantity */}
                <div className=" ">
                  <p className="font-semibold">Quantity: {item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="w-8 h-8 rounded bg-gray-200"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="w-8 h-8 rounded bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeCart(item.id))}
                className="bg-red-900 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Remove Product
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center text-center">
            <button
              onClick={() =>
                navigate("/Checkout", {
                  state: {
                    cartItems,
                  },
                })
              }
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold text-lg px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Go to Order Confirm Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
