import React from 'react';
import { LuShoppingCart } from '../../../node_modules/react-icons/lu';
import { FiSearch } from 'react-icons/fi';



const Navbar = () => {
    return (
        <div className="bg-transparent w-[90%] mx-auto">
            <div className="flex justify-between py-4 rounded-l-3xl rounded-r-3xl">
                <div className="">
                    <img src="/src/assets/Unofficial_JavaScript_logo_2.svg.png" alt="" className="h-13 w-full object-contain" />
                </div>
                <div className='flex gap-10'>
                    <div className="relative  sm:w-70 md:w-96 lg:w-[500px] xl:w-[600px] w-65">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full h-12 pl-11 pr-28 rounded-xl border border-gray-300 bg-white shadow-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                        />

                        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-5 rounded-lg bg-amber-400 text-white font-medium hover:bg-violet-700 transition cursor-pointer">
                            Search
                        </button>
                    </div>
                    <div className="bg-amber-500 rounded-t-2xl">
                        <button className="bg-amber-200 rounded-t-2xl text-3xl p-2 cursor-pointer"><LuShoppingCart /></button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center lg:gap-15 md:gap-10 gap-5 bg-gray-200/30 p-4 rounded-l-3xl rounded-r-3xl font-bold text-black text-base lg:text-lg md:text-lg sticky top-0 z-50">
                <a href="#">Home</a>
                <a href="#">Product</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
            <div className="flex justify-start mt-4 text-2xl font-bold text-black bg-amber-100">
                <p className='text-lg'>WELCOME TO OUR OFFICIAL WEBSITE BDMART.COM </p>
            </div>
        </div>
    );
};

export default Navbar;