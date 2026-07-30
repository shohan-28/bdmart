import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa6";
import { districtData } from "../DistrictData/DistrictData";

const Checkout = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        No Product Selected
      </div>
    );
  }

  const { product, quantity } = state;

  const deliveryCharge = 60;
  const total = product.price * quantity + deliveryCharge;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    thana: "",
    postcode: "",
    address: "",
    note: "",
    payment: "cod",
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Order Placed Successfully 🎉");
  };

  return (
    <section className="min-h-screen py-14">

      <div className="w-[92%] max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ===========================
    Shipping Information
=========================== */}

<form
  onSubmit={handleSubmit}
  className="lg:col-span-2 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl p-8"
>

  <div className="mb-8">

    <h2 className="text-3xl font-bold text-gray-800">
      Shipping Information
    </h2>

    <p className="text-gray-500 mt-2">
      Please fill in your delivery information.
    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-6">

    {/* Full Name */}

    <div className="relative">

      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"/>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
      />

    </div>

    {/* Phone */}

    <div className="relative">

      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400"/>

      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        maxLength={11}
        required
        className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
      />

    </div>

    {/* District */}

    <div>

      <label className="text-sm font-semibold text-gray-600 mb-2 block">
        District
      </label>

      <select
        name="district"
        value={formData.district}
        onChange={(e)=>{

          setFormData({
            ...formData,
            district:e.target.value,
            thana:"",
          });

        }}
        required
        className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
      >

        <option value="">
          Select District
        </option>

        {Object.keys(districtData).map((district)=>(

          <option
            key={district}
            value={district}
          >

            {district}

          </option>

        ))}

      </select>

    </div>

    {/* Thana */}

    <div>

      <label className="text-sm font-semibold text-gray-600 mb-2 block">
        Thana / Upazila
      </label>

      <select
        name="thana"
        value={formData.thana}
        onChange={handleChange}
        required
        className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
      >

        <option value="">
          Select Thana
        </option>

        {districtData[formData.district]?.map((thana)=>(

          <option
            key={thana}
            value={thana}
          >

            {thana}

          </option>

        ))}

      </select>

    </div>

    {/* Postal Code */}

    <input
      type="text"
      name="postcode"
      value={formData.postcode}
      onChange={handleChange}
      placeholder="Postal Code"
      required
      className="h-14 rounded-2xl border border-gray-200 bg-white px-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
    />

  </div>

  {/* Address */}

  <div className="relative mt-6">

    <FiMapPin className="absolute left-4 top-6 text-xl text-gray-400"/>

    <textarea
      rows={5}
      name="address"
      value={formData.address}
      onChange={handleChange}
      placeholder="House No, Road No, Village, Area..."
      required
      className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 pt-5 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
    />

  </div>

  {/* Order Note */}

  <textarea
    rows={3}
    name="note"
    value={formData.note}
    onChange={handleChange}
    placeholder="Order Note (Optional)"
    className="w-full mt-6 rounded-2xl border border-gray-200 bg-white p-5 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
  />

  {/* Payment */}

  <div className="mt-10">

    <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">

      <FiCreditCard />

      Payment Method

    </h2>

    <div className="grid md:grid-cols-3 gap-5">

      {/* COD */}

      <label className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
        formData.payment==="cod"
        ? "border-amber-500 bg-amber-50"
        : "border-gray-200 bg-white hover:border-amber-400"
      }`}>

        <input
          type="radio"
          className="hidden"
          value="cod"
          name="payment"
          checked={formData.payment==="cod"}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center">

          <BsCashCoin className="text-4xl text-amber-500"/>

          <h3 className="font-bold mt-3">
            Cash On Delivery
          </h3>

        </div>

      </label>

      {/* BKash */}

      <label className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
        formData.payment==="bkash"
        ? "border-pink-500 bg-pink-50"
        : "border-gray-200 bg-white hover:border-pink-400"
      }`}>

        <input
          type="radio"
          className="hidden"
          value="bkash"
          name="payment"
          checked={formData.payment==="bkash"}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center">

          <FaMoneyBillWave className="text-4xl text-pink-500"/>

          <h3 className="font-bold mt-3">
            BKash
          </h3>

        </div>

      </label>

      {/* Nagad */}

      <label className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
        formData.payment==="nagad"
        ? "border-orange-500 bg-orange-50"
        : "border-gray-200 bg-white hover:border-orange-400"
      }`}>

        <input
          type="radio"
          className="hidden"
          value="nagad"
          name="payment"
          checked={formData.payment==="nagad"}
          onChange={handleChange}
        />

        <div className="flex flex-col items-center">

          <FaMoneyBillWave className="text-4xl text-orange-500"/>

          <h3 className="font-bold mt-3">
            Nagad
          </h3>

        </div>

      </label>

    </div>

  </div>

    {/* ===========================
      Order Summary
  =========================== */}

  <button
    type="submit"
    className="mt-10 w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
  >
    Place Order
  </button>

</form>

{/* ===========================
    Product Summary
=========================== */}

<div className="sticky top-8 h-fit rounded-3xl border border-white/40 bg-white/70 backdrop-blur-2xl shadow-2xl overflow-hidden">

  {/* Image */}

  <div className="bg-gradient-to-br from-gray-100 to-white p-8">

    <img
      src={product.image}
      alt={product.name}
      className="w-full h-72 object-contain hover:scale-105 transition duration-500"
    />

  </div>

  {/* Content */}

  <div className="p-7">

    <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold text-amber-700">
      {product.category}
    </span>

    <h2 className="mt-4 text-2xl font-bold text-gray-800">
      {product.name}
    </h2>

    <div className="mt-3 flex items-center justify-between">

      <div>

        <p className="text-sm text-gray-500">
          Brand
        </p>

        <h4 className="font-semibold">
          {product.brand}
        </h4>

      </div>

      <div className="text-right">

        <p className="text-sm text-gray-500">
          Rating
        </p>

        <h4 className="font-semibold text-yellow-500">
          ⭐ {product.rating}
        </h4>

      </div>

    </div>

    <hr className="my-6"/>

    {/* Price */}

    <div className="space-y-4">

      <div className="flex justify-between">

        <span className="text-gray-500">
          Price
        </span>

        <span className="font-semibold">
          ${product.price}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-500">
          Quantity
        </span>

        <span className="font-semibold">
          {quantity}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-500">
          Delivery
        </span>

        <span className="font-semibold">
          ${deliveryCharge}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-gray-500">
          Discount
        </span>

        <span className="font-semibold text-green-600">
          -{product.discount}%
        </span>

      </div>

    </div>

    <hr className="my-6"/>

    {/* Total */}

    <div className="flex justify-between items-center">

      <h3 className="text-xl font-bold">
        Total
      </h3>

      <h2 className="text-3xl font-extrabold text-amber-500">
        ${total}
      </h2>

    </div>

    {/* Delivery Box */}

    <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">

      <div className="flex items-center gap-3">

        <span className="text-3xl">
          🚚
        </span>

        <div>

          <h4 className="font-bold text-green-700">
            Fast Delivery
          </h4>

          <p className="text-sm text-gray-600">
            Estimated Delivery: 2-3 Working Days
          </p>

        </div>

      </div>

    </div>

    {/* Security */}

    <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">

      <div className="flex items-center gap-3">

        <span className="text-3xl">
          🔒
        </span>

        <div>

          <h4 className="font-bold text-blue-700">
            Secure Checkout
          </h4>

          <p className="text-sm text-gray-600">
            SSL Encrypted & 100% Secure Payment
          </p>

        </div>

      </div>

    </div>

    {/* Return */}

    <div className="mt-5 rounded-2xl border border-purple-200 bg-purple-50 p-5">

      <div className="flex items-center gap-3">

        <span className="text-3xl">
          ↩️
        </span>

        <div>

          <h4 className="font-bold text-purple-700">
            Easy Return
          </h4>

          <p className="text-sm text-gray-600">
            7 Days Return Policy Available
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

</div>

</div>

</section>
);
};

export default Checkout;