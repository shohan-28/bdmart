import React from "react";
import { LuShoppingCart } from "../../../node_modules/react-icons/lu";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-transparent w-[90%] mx-auto">
      <div className="flex justify-between py-4 rounded-l-3xl rounded-r-3xl">
        <div className="">
          <img
            src="/src/assets/Unofficial_JavaScript_logo_2.svg.png"
            alt=""
            className="h-10 lg:h-13 w-full object-contain"
          />
        </div>
        <div className="flex gap-10">
          <div className="relative  sm:w-70 md:w-96 lg:w-[500px] xl:w-[600px] w-65 ">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 lg:h-12 pl-11 pr-28 rounded-xl border border-gray-300 bg-white shadow-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
            />

            <button className="absolute right-1 lg:right-1.5 top-1/2 -translate-y-1/2 h-9 flex items-center p-2 lg:p-5 rounded-lg bg-amber-400 text-[12px] lg:text-[15px] text-white font-medium hover:bg-violet-700 transition cursor-pointer">
              Search
            </button>
          </div>

          <div className="bg-amber-500 rounded-t-2xl flex justify-end">
            <button className="relative bg-amber-200 rounded-t-2xl text-xl lg:text-3xl p-2 cursor-pointer">
              <LuShoppingCart />

              {/* Cart Quantity */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center text-[10px] font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
