import React from 'react';

const NavbarLink = () => {
    return (
        <div className='w-[90%] mx-auto py-2'>
            <div className="flex justify-center lg:gap-15 md:gap-10 gap-5 bg-gray-200/70 shadow-md p-4 rounded-l-3xl rounded-r-3xl font-bold text-black text-base lg:text-lg md:text-lg  w-full z-50">
                <a href="#">Home</a>
                <a href="#">Product</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </div>
        </div>
    );
};

export default NavbarLink;