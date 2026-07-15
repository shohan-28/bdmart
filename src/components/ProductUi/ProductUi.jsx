import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../Feature/ProductSlice';

const ProductUi = () => {
    const ProductData = useSelector((state) => state.product.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);
    return (
        <div className='py-10'>
            <div className="grid grid-cols-4 gap-5">
                {ProductData.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />

                        <h2 className="font-bold mt-3">{product.name}</h2>

                        <p className="text-green-600">${product.price}</p>

                        <p>{product.category}</p>

                        {product.isNew && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                                New
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductUi;