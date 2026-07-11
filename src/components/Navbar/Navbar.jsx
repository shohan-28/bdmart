import React from 'react';
import { LuShoppingCart } from '../../../node_modules/react-icons/lu';



const Navbar = () => {
    return (
        <div className="bg-transparent w-[90%] mx-auto">
            <div className="flex justify-between p-4 rounded-l-3xl rounded-r-3xl">
                <div className="">
                    <img src="/src/assets/Unofficial_JavaScript_logo_2.svg.png" alt="" className="h-13 w-full object-contain" />
                </div>
                <div className="bg-amber-500 rounded-t-2xl">
                    <p className="bg-amber-200 rounded-t-2xl text-3xl p-2"><LuShoppingCart /></p>
                </div>
            </div>
            <div className="flex justify-center lg:gap-15 md:gap-10 gap-5 bg-gray-200/30 p-4 rounded-l-3xl rounded-r-3xl font-bold text-black text-base lg:text-lg md:text-lg">
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