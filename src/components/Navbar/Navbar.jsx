import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-transparent w-[90%] mx-auto">
            <div>
                <div>
                    <img src="/src/assets" alt="" />
                </div>
                <div></div>
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