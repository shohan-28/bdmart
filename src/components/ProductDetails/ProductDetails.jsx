import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { fetchProduct } from "../Feature/ProductSlice";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const ProductData = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

     const product = useLoaderData();
  return (
    <div>
      <section className="min-h-screen bg-gray-50 py-10 md:py-16">
        {" "}
        <div className="w-[92%] max-w-7xl mx-auto">
          {" "}
          {/* Breadcrumb */}{" "}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            {" "}
            <span className="cursor-pointer hover:text-black">Home</span>{" "}
            <span>/</span>{" "}
            <span className="cursor-pointer hover:text-black">Products</span>{" "}
            <span>/</span>{" "}
            <span className="text-gray-900 font-medium">
              {" "}
              Product Details{" "}
            </span>{" "}
          </div>{" "}
          {/* Main Product Area */}{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {" "}
            {/* LEFT - Product Image */}{" "}
            <div className="relative">
              {" "}
              {/* New Badge */}{" "}
              <span className="absolute top-5 left-5 z-10 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                {" "}
                New Arrival{" "}
              </span>{" "}
              {/* Wishlist */}{" "}
              <button className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-black hover:text-white">
                {" "}
                <FiHeart className="text-xl" />{" "}
              </button>{" "}
              {/* Main Image */}{" "}
              <div className="flex h-[420px] md:h-[550px] items-center justify-center overflow-hidden rounded-3xl bg-white p-8 shadow-sm">
                {" "}
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  alt="Product"
                  className="h-full w-full object-contain transition duration-500 hover:scale-105"
                />{" "}
              </div>{" "}
              {/* Thumbnail Images */}{" "}
              <div className="mt-5 grid grid-cols-4 gap-4">
                {" "}
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-2xl border-2 border-black bg-white p-3">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                    alt="Product thumbnail"
                    className="h-full w-full object-contain"
                  />{" "}
                </div>{" "}
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 hover:border-black">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
                    alt="Product thumbnail"
                    className="h-full w-full object-contain"
                  />{" "}
                </div>{" "}
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 hover:border-black">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772"
                    alt="Product thumbnail"
                    className="h-full w-full object-contain"
                  />{" "}
                </div>{" "}
                <div className="flex h-24 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-white p-3 hover:border-black">
                  {" "}
                  <img
                    src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2"
                    alt="Product thumbnail"
                    className="h-full w-full object-contain"
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* RIGHT - Product Information */}{" "}
            <div className="flex flex-col justify-center">
              {" "}
              {/* Category */}{" "}
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                {" "}
                Premium Footwear{" "}
              </p>{" "}
              {/* Product Title */}{" "}
              <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                {" "}
                Air Max Premium Running Shoes{" "}
              </h1>{" "}
              {/* Rating */}{" "}
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {" "}
                <div className="flex items-center gap-1">
                  {" "}
                  <IoStar className="text-lg text-yellow-500" />{" "}
                  <IoStar className="text-lg text-yellow-500" />{" "}
                  <IoStar className="text-lg text-yellow-500" />{" "}
                  <IoStar className="text-lg text-yellow-500" />{" "}
                  <IoStar className="text-lg text-yellow-500" />{" "}
                </div>{" "}
                <span className="text-sm font-medium text-gray-500">
                  {" "}
                  4.9 (128 Reviews){" "}
                </span>{" "}
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>{" "}
                <span className="text-sm font-semibold text-green-600">
                  {" "}
                  In Stock{" "}
                </span>{" "}
              </div>{" "}
              {/* Price */}{" "}
              <div className="mt-7 flex items-center gap-4">
                {" "}
                <span className="text-4xl font-bold text-gray-900">
                  {" "}
                  $129.00{" "}
                </span>{" "}
                <span className="text-xl text-gray-400 line-through">
                  {" "}
                  $159.00{" "}
                </span>{" "}
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                  {" "}
                  19% OFF{" "}
                </span>{" "}
              </div>{" "}
              {/* Description */}{" "}
              <p className="mt-7 max-w-xl text-base leading-7 text-gray-600">
                {" "}
                Experience premium comfort and modern style with our latest
                running shoes. Designed with lightweight materials, responsive
                cushioning, and a breathable upper for all-day comfort.{" "}
              </p>{" "}
              {/* Divider */} <div className="my-8 h-px bg-gray-200"></div>{" "}
              {/* Size */}{" "}
              <div>
                {" "}
                <div className="mb-4 flex items-center justify-between">
                  {" "}
                  <h3 className="font-semibold text-gray-900">
                    {" "}
                    Select Size{" "}
                  </h3>{" "}
                  <button className="text-sm font-medium underline">
                    {" "}
                    Size Guide{" "}
                  </button>{" "}
                </div>{" "}
                <div className="flex flex-wrap gap-3">
                  {" "}
                  <button className="h-12 w-14 rounded-xl border border-gray-300 bg-white font-medium hover:border-black">
                    {" "}
                    7{" "}
                  </button>{" "}
                  <button className="h-12 w-14 rounded-xl border-2 border-black bg-black font-medium text-white">
                    {" "}
                    8{" "}
                  </button>{" "}
                  <button className="h-12 w-14 rounded-xl border border-gray-300 bg-white font-medium hover:border-black">
                    {" "}
                    9{" "}
                  </button>{" "}
                  <button className="h-12 w-14 rounded-xl border border-gray-300 bg-white font-medium hover:border-black">
                    {" "}
                    10{" "}
                  </button>{" "}
                  <button className="h-12 w-14 rounded-xl border border-gray-300 bg-white font-medium hover:border-black">
                    {" "}
                    11{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              {/* Quantity + Cart */}{" "}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {" "}
                {/* Quantity */}{" "}
                <div className="flex h-14 items-center justify-between rounded-xl border border-gray-300 bg-white px-4 sm:w-36">
                  {" "}
                  <button className="text-xl text-gray-500 hover:text-black">
                    {" "}
                    <FiMinus />{" "}
                  </button>{" "}
                  <span className="font-semibold">1</span>{" "}
                  <button className="text-xl text-gray-500 hover:text-black">
                    {" "}
                    <FiPlus />{" "}
                  </button>{" "}
                </div>{" "}
                {/* Add to Cart */}{" "}
                <button className="flex h-14 flex-1 items-center justify-center gap-3 rounded-xl bg-black px-6 font-semibold text-white transition hover:bg-gray-800">
                  {" "}
                  <FiShoppingBag className="text-xl" /> Add to Cart{" "}
                </button>{" "}
              </div>{" "}
              {/* Buy Now */}{" "}
              <button className="mt-4 h-14 w-full rounded-xl border-2 border-black bg-white font-semibold text-black transition hover:bg-black hover:text-white">
                {" "}
                Buy Now{" "}
              </button>{" "}
              {/* Delivery Info */}{" "}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {" "}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                  {" "}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                    {" "}
                    <FiTruck className="text-xl" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className="font-semibold text-gray-900">
                      {" "}
                      Free Delivery{" "}
                    </h4>{" "}
                    <p className="mt-1 text-sm text-gray-500">
                      {" "}
                      Delivery within 3-5 days{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                  {" "}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                    {" "}
                    <FiShoppingBag className="text-xl" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h4 className="font-semibold text-gray-900">
                      {" "}
                      Easy Returns{" "}
                    </h4>{" "}
                    <p className="mt-1 text-sm text-gray-500">
                      {" "}
                      30 days return policy{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Product Details Section */}{" "}
          <div className="mt-20 rounded-3xl bg-white p-6 shadow-sm md:p-10">
            {" "}
            <div className="border-b border-gray-200 pb-5">
              {" "}
              <h2 className="text-2xl font-bold text-gray-900">
                {" "}
                Product Details{" "}
              </h2>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
              {" "}
              <div>
                {" "}
                <h3 className="mb-4 text-lg font-semibold">
                  {" "}
                  Description{" "}
                </h3>{" "}
                <p className="leading-7 text-gray-600">
                  {" "}
                  Crafted for everyday performance and comfort, this premium
                  footwear combines modern design with advanced cushioning
                  technology.{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="mb-4 text-lg font-semibold">
                  {" "}
                  Specifications{" "}
                </h3>{" "}
                <div className="space-y-3 text-sm">
                  {" "}
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    {" "}
                    <span className="text-gray-500">Brand</span>{" "}
                    <span className="font-medium">Premium Brand</span>{" "}
                  </div>{" "}
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    {" "}
                    <span className="text-gray-500">Material</span>{" "}
                    <span className="font-medium">Mesh & Rubber</span>{" "}
                  </div>{" "}
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    {" "}
                    <span className="text-gray-500">Category</span>{" "}
                    <span className="font-medium">Running Shoes</span>{" "}
                  </div>{" "}
                  <div className="flex justify-between">
                    {" "}
                    <span className="text-gray-500">Availability</span>{" "}
                    <span className="font-medium text-green-600">
                      {" "}
                      In Stock{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </div>
  );
};

export default ProductDetails;
