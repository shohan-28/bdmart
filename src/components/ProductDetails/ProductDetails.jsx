
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

import { IoStar } from "react-icons/io5";

import { fetchProduct } from "../Feature/ProductSlice";


const ProductDetails = () => {

  // URL থেকে productId নেওয়া
  // Example: /ProductDetails/1
  const { productId } = useParams();


  // Redux থেকে product data নেওয়া
  const ProductData = useSelector(
    (state) => state.product.product
  );

  const loading = useSelector(
    (state) => state.product.loading
  );

  const error = useSelector(
    (state) => state.product.error
  );


  // Redux dispatch
  const dispatch = useDispatch();


  // Product fetch করা
  useEffect(() => {

    // যদি Redux এ product data না থাকে,
    // তাহলে fetch করবে
    if (ProductData.length === 0) {
      dispatch(fetchProduct());
    }

  }, [dispatch, ProductData.length]);


  // URL এর productId দিয়ে নির্দিষ্ট product খুঁজে বের করা
  const product = ProductData.find(
    (item) => Number(item.id) === Number(productId)
  );


  // Selected Image
  const [selectedImage, setSelectedImage] = useState("");


  // Quantity
  const [quantity, setQuantity] = useState(1);


  // Product পাওয়া গেলে প্রথম image selected হবে
  useEffect(() => {

    if (product) {
      setSelectedImage(
        product.images?.[0] || product.image
      );
    }

  }, [product]);


  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-bold">
          Loading Product...
        </h2>
      </div>
    );
  }


  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl font-semibold text-red-500">
          {error}
        </p>
      </div>
    );
  }


  // Product Not Found
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">

        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>

        <Link
          to="/"
          className="rounded-xl bg-black px-6 py-3 font-semibold text-white"
        >
          Back To Home
        </Link>

      </div>
    );
  }


  return (

    <section className="min-h-screen bg-gray-50 py-10 md:py-16">

      <div className="mx-auto w-[90%] ">


        {/* Breadcrumb */}

        <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">

          <Link
            to="/"
            className="cursor-pointer hover:text-black"
          >
            Home
          </Link>

          <span>/</span>

          <span className="cursor-pointer hover:text-black">
            Products
          </span>

          <span>/</span>

          <span className="font-medium text-gray-900">
            {product.name}
          </span>

        </div>



        {/* Main Product Area */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">


          {/* =========================
              LEFT SIDE
          ========================== */}

          <div className="relative">


            {/* New Badge */}

            {product.isNew && (

              <span className="absolute left-5 top-5 z-10 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">

                New Arrival

              </span>

            )}



            {/* Wishlist */}

            <button className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white">

              <FiHeart className="text-xl" />

            </button>



            {/* Main Image */}

            <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-sm md:h-[550px]">

              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-contain transition duration-500 hover:scale-105"
              />

            </div>



            {/* Thumbnail Images */}

            <div className="mt-5 grid grid-cols-4 gap-4">

              {product.images?.map((image, index) => (

                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex h-24 cursor-pointer items-center justify-center rounded-2xl bg-white p-3 ${
                    selectedImage === image
                      ? "border-2 border-black"
                      : "border border-gray-200 hover:border-black"
                  }`}
                >

                  <img
                    src={image}
                    alt={`${product.name} thumbnail`}
                    className="h-full w-full object-contain"
                  />

                </button>

              ))}

            </div>

          </div>



          {/* =========================
              RIGHT SIDE
          ========================== */}

          <div className="flex flex-col justify-center">


            {/* Category */}

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">

              {product.category}

            </p>



            {/* Product Title */}

            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">

              {product.name}

            </h1>



            {/* Rating */}

            <div className="mt-5 flex flex-wrap items-center gap-4">


              {/* Stars */}

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                  <IoStar
                    key={star}
                    className="text-lg text-yellow-500"
                  />

                ))}

              </div>



              {/* Rating */}

              <span className="text-sm font-medium text-gray-500">

                {product.rating} ({product.reviews} Reviews)

              </span>



              <span className="h-1 w-1 rounded-full bg-gray-300"></span>



              {/* Stock */}

              <span
                className={`text-sm font-semibold ${
                  product.stock
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >

                {product.stock
                  ? "In Stock"
                  : "Out of Stock"}

              </span>

            </div>



            {/* Price */}

            <div className="mt-7 flex flex-wrap items-center gap-4">

              <span className="text-4xl font-bold text-gray-900">

                ৳ {product.price}

              </span>


              {product.oldPrice && (

                <span className="text-xl text-gray-400 line-through">

                  ${product.oldPrice}

                </span>

              )}


              {product.discount && (

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">

                  {product.discount}% OFF

                </span>

              )}

            </div>



            {/* Description */}

            <p className="mt-7 max-w-xl text-base leading-7 text-gray-600">

              {product.description}

            </p>



            {/* Divider */}

            <div className="my-8 h-px bg-gray-200"></div>



            {/* Size */}

            <div>

              <div className="mb-4 flex items-center justify-between">

                <h3 className="font-semibold text-gray-900">

                  Select Size

                </h3>

                <button className="text-sm font-medium underline">

                  Size Guide

                </button>

              </div>



              <div className="flex flex-wrap gap-3">

                {product.sizes?.map((size) => (

                  <button
                    key={size}
                    className="h-12 w-14 rounded-xl border border-gray-300 bg-white font-medium hover:border-black"
                  >

                    {size}

                  </button>

                ))}

              </div>

            </div>



            {/* Quantity + Cart */}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">


              {/* Quantity */}

              <div className="flex h-14 items-center justify-between rounded-xl border border-gray-300 bg-white px-4 sm:w-36">


                {/* Minus */}

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                  className="text-xl text-gray-500 hover:text-black"
                >

                  <FiMinus />

                </button>



                {/* Quantity */}

                <span className="font-semibold">

                  {quantity}

                </span>



                {/* Plus */}

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="text-xl text-gray-500 hover:text-black"
                >

                  <FiPlus />

                </button>

              </div>



              {/* Add To Cart */}

              <button
                disabled={!product.stock}
                className="flex h-14 flex-1 items-center justify-center gap-3 rounded-xl bg-black px-6 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
              >

                <FiShoppingBag className="text-xl" />

                Add to Cart

              </button>

            </div>



            {/* Buy Now */}

            <button className="mt-4 h-14 w-full rounded-xl border-2 border-black bg-white font-semibold text-black transition hover:bg-black hover:text-white">

              Buy Now

            </button>



            {/* Delivery Info */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">


              {/* Free Delivery */}

              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">

                  <FiTruck className="text-xl" />

                </div>

                <div>

                  <h4 className="font-semibold text-gray-900">

                    Free Delivery

                  </h4>

                  <p className="mt-1 text-sm text-gray-500">

                    Delivery within 3-5 days

                  </p>

                </div>

              </div>



              {/* Easy Returns */}

              <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">

                  <FiShoppingBag className="text-xl" />

                </div>

                <div>

                  <h4 className="font-semibold text-gray-900">

                    Easy Returns

                  </h4>

                  <p className="mt-1 text-sm text-gray-500">

                    30 days return policy

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>



        {/* =========================
            PRODUCT DETAILS
        ========================== */}

        <div className="mt-20 rounded-3xl bg-white p-6 shadow-sm md:p-10">


          <div className="border-b border-gray-200 pb-5">

            <h2 className="text-2xl font-bold text-gray-900">

              Product Details

            </h2>

          </div>



          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">


            {/* Description */}

            <div>

              <h3 className="mb-4 text-lg font-semibold">

                Description

              </h3>

              <p className="leading-7 text-gray-600">

                {product.description}

              </p>

            </div>



            {/* Specifications */}

            <div>

              <h3 className="mb-4 text-lg font-semibold">

                Specifications

              </h3>


              <div className="space-y-3 text-sm">


                {/* Brand */}

                <div className="flex justify-between border-b border-gray-100 pb-3">

                  <span className="text-gray-500">

                    Brand

                  </span>

                  <span className="font-medium">

                    {product.brand}

                  </span>

                </div>



                {/* Material */}

                <div className="flex justify-between border-b border-gray-100 pb-3">

                  <span className="text-gray-500">

                    Material

                  </span>

                  <span className="font-medium">

                    {product.material}

                  </span>

                </div>



                {/* Category */}

                <div className="flex justify-between border-b border-gray-100 pb-3">

                  <span className="text-gray-500">

                    Category

                  </span>

                  <span className="font-medium">

                    {product.category}

                  </span>

                </div>



                {/* Availability */}

                <div className="flex justify-between">

                  <span className="text-gray-500">

                    Availability

                  </span>

                  <span
                    className={`font-medium ${
                      product.stock
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >

                    {product.stock
                      ? "In Stock"
                      : "Out of Stock"}

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};


export default ProductDetails;

