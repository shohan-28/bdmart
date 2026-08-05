import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";
import { districtData } from "../DistrictData/DistrictData";
import { useDispatch } from "react-redux";
import { clearCart } from "../Feature/CartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Product Found</h2>
      </div>
    );
  }

  const isBuyNow = !!state.product;

  const product = state.product || null;
  const quantity = state.quantity || 1;

  const cartItems = state.cartItems || [];

  const subtotal = isBuyNow
    ? product.price * quantity
    : cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    thana: "",
    address: "",
    note: "",
  });

  // Dhaka এর ভেতরে হলে ৳60, বাইরে হলে ৳100 — জেলা সিলেক্ট করার সাথে সাথে অটো সেট হবে
  const isDhaka = formData.district.trim().includes("Dhaka");
  const deliveryCharge = isDhaka ? 60 : 100;

  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.phone.length !== 11) {
    alert("⚠️ অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন");
    return;
  }

  try {
    const res = await fetch("https://sprienge-backend.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        items: isBuyNow ? [{ ...product, quantity }] : cartItems,
        subtotal,
        deliveryCharge,
        total,
      }),
    });

    if (!res.ok) throw new Error("Order failed");

    if (!isBuyNow) dispatch(clearCart());
    alert("🎉 Order Placed Successfully");
  } catch (err) {
    alert("❌ Order failed, try again");
  }
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
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

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
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, phone: digitsOnly });
                  }}
                  placeholder="Phone Number"
                  inputMode="numeric"
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
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      district: e.target.value,
                      thana: "",
                    });
                  }}
                  required
                  className="w-full h-14 rounded-2xl border border-gray-200 bg-white px-4 outline-none transition-all duration-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                >
                  <option value="">Select District</option>

                  {Object.keys(districtData).map((district) => (
                    <option key={district} value={district}>
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
                  <option value="">Select Thana</option>

                  {districtData[formData.district]?.map((thana) => (
                    <option key={thana} value={thana}>
                      {thana}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="relative mt-6">
              <FiMapPin className="absolute left-4 top-6 text-xl text-gray-400" />

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

            {/* Delivery Charge (auto based on district) */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                <FiTruck />
                Delivery Charge
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Inside Dhaka */}
                <div
                  className={`rounded-2xl border-2 p-5 transition ${
                    isDhaka
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-bold">ঢাকা শহরের ভিতরে</h3>
                    <p className="mt-2 text-2xl font-bold text-amber-500">
                      ৳60
                    </p>
                  </div>
                </div>

                {/* Outside Dhaka */}
                <div
                  className={`rounded-2xl border-2 p-5 transition ${
                    !isDhaka && formData.district
                      ? "border-amber-500 bg-amber-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-bold">ঢাকা শহরের বাইরে</h3>
                    <p className="mt-2 text-2xl font-bold text-amber-500">
                      ৳100
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                জেলা সিলেক্ট করলে ডেলিভারি চার্জ স্বয়ংক্রিয়ভাবে সেট হয়ে
                যাবে।
              </p>
            </div>

            <button
              type="submit"
              className="mt-10 w-full h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              Place Order
            </button>
          </form>

          {/* ===========================
              Order Summary
          =========================== */}

          <div className="sticky top-8 h-fit rounded-3xl border border-white/40 bg-white/70 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Order Summary</h2>

              <p className="text-gray-500 text-sm">
                {isBuyNow ? 1 : cartItems.length} Product
                {isBuyNow ? "" : cartItems.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {isBuyNow ? (
                <div className="flex gap-4 p-5 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl bg-gray-100 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Qty : {quantity}
                    </p>

                    <p className="font-bold text-amber-600 mt-2">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl bg-gray-100 object-contain"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold line-clamp-2">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Qty : {item.quantity}
                      </p>

                      <p className="font-bold text-amber-600 mt-2">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-7">
              <hr />

              <div className="mt-5 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${deliveryCharge}</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-amber-500">${total}</span>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-4">
                <h4 className="font-semibold text-green-700">
                  🚚 Fast Delivery
                </h4>

                <p className="text-sm text-gray-600 mt-1">
                  Estimated Delivery within 2-3 Working Days.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔒</span>

                  <div>
                    <h4 className="font-bold text-blue-700">
                      Secure Checkout
                    </h4>

                    <p className="text-sm text-gray-600">
                      SSL Encrypted &amp; 100% Secure Payment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-purple-200 bg-purple-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">↩️</span>

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
