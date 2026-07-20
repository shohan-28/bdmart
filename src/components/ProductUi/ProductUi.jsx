import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../Feature/ProductSlice';
import { Link } from 'react-router-dom';

const ProductUi = () => {
    const ProductData = useSelector((state) => state.product.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);
    return (
        <div className='w-[90%] mx-auto py-10'>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                {ProductData.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow relative"
                    >
                        <Link to= {`/ProductDetails/${product.id}`}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        </Link>

                        <h2 className="font-bold mt-3">{product.name}</h2>

                        <p className="text-green-600">${product.price}</p>

                        <div className='flex justify-between items-center'>
                            <p>{product.category}</p>
                            <button className='bg-black hover:bg-gray-600 cursor-pointer text-white p-2 rounded-lg flex items-center'>Order Now</button>
                        </div>

                        {product.isNew && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-sm flex absolute top-2 right-2">
                                New
                            </span>
                        )}

                        {product.discount && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm flex absolute top-2 left-2">
                                {product.discount}% Off
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductUi;