import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiMinus,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import { clearCart } from "../../redux/features/cart/cartSlice";
import districtData from "../../data/DistrictData";

const API_URL = "https://sprienge-backend.onrender.com/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = location.state || {};

  const isBuyNow = Boolean(state.product);

  const product = state.product || null;

  const buyNowQuantity = Math.max(
    1,
    Number(state.quantity) || 1
  );

  const cartItems = Array.isArray(state.cartItems)
    ? state.cartItems
    : [];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    thana: "",
    address: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  /*
  ========================================
  DISTRICT / THANA
  ========================================
  */

  const selectedDistrict = districtData.find(
    (item) =>
      item.district === formData.district ||
      item.name === formData.district
  );

  const thanaList =
    selectedDistrict?.thanas ||
    selectedDistrict?.thana ||
    [];

  /*
  ========================================
  NORMALIZE CART ITEM
  ========================================
  */

  const normalizeItem = (item, quantityOverride = null) => {
    const price = Number(item?.price);

    const quantity = Math.max(
      1,
      Number(quantityOverride ?? item?.quantity) || 1
    );

    return {
      productId:
        item?.productId ??
        item?.id ??
        null,

      productName:
        item?.productName ??
        item?.name ??
        "",

      productImage:
        item?.productImage ??
        item?.image ??
        "",

      price: Number.isFinite(price) ? price : 0,

      quantity,

      subtotal:
        (Number.isFinite(price) ? price : 0) * quantity,
    };
  };

  /*
  ========================================
  ORDER ITEMS
  ========================================
  */

  const orderItems = useMemo(() => {
    if (isBuyNow && product) {
      return [
        normalizeItem(
          product,
          buyNowQuantity
        ),
      ];
    }

    return cartItems.map((item) =>
      normalizeItem(item)
    );
  }, [
    isBuyNow,
    product,
    buyNowQuantity,
    cartItems,
  ]);

  /*
  ========================================
  SUBTOTAL
  ========================================
  */

  const subtotal = useMemo(() => {
    return orderItems.reduce(
      (total, item) =>
        total + Number(item.subtotal || 0),
      0
    );
  }, [orderItems]);

  /*
  ========================================
  DELIVERY CHARGE
  ========================================
  */

  const deliveryCharge = useMemo(() => {
    if (!formData.district) {
      return 0;
    }

    const district =
      formData.district.toLowerCase();

    return district.includes("dhaka")
      ? 60
      : 100;
  }, [formData.district]);

  /*
  ========================================
  TOTAL
  ========================================
  */

  const total = subtotal + deliveryCharge;

  /*
  ========================================
  INPUT CHANGE
  ========================================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        thana: "",
      }));

      return;
    }

    if (name === "phone") {
      const phone = value
        .replace(/\D/g, "")
        .slice(0, 11);

      setFormData((prev) => ({
        ...prev,
        phone,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  ========================================
  VALIDATE CART
  ========================================
  */

  const validateItems = () => {
    if (!orderItems.length) {
      return "Your cart is empty.";
    }

    for (const item of orderItems) {
      if (!item.productName) {
        return "Product name is missing.";
      }

      if (
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) < 0
      ) {
        return `Invalid price for ${item.productName}.`;
      }

      if (
        !Number.isFinite(Number(item.quantity)) ||
        Number(item.quantity) < 1
      ) {
        return `Invalid quantity for ${item.productName}.`;
      }
    }

    return null;
  };

  /*
  ========================================
  PLACE ORDER
  ========================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    /*
    CUSTOMER VALIDATION
    */

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const district = formData.district.trim();
    const thana = formData.thana.trim();
    const address = formData.address.trim();
    const note = formData.note.trim();

    if (!name) {
      alert("Please enter your name.");
      return;
    }

    if (!phone) {
      alert("Please enter your phone number.");
      return;
    }

    if (!/^01\d{9}$/.test(phone)) {
      alert(
        "Please enter a valid Bangladesh phone number.\nExample: 01712345678"
      );
      return;
    }

    if (!district) {
      alert("Please select your district.");
      return;
    }

    if (!thana) {
      alert("Please select your thana.");
      return;
    }

    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }

    /*
    ITEM VALIDATION
    */

    const itemError = validateItems();

    if (itemError) {
      alert(itemError);
      return;
    }

    /*
    NORMALIZE ITEMS AGAIN
    */

    const finalItems = orderItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      price: Number(item.price),
      quantity: Number(item.quantity),
      subtotal:
        Number(item.price) *
        Number(item.quantity),
    }));

    /*
    CALCULATE SUBTOTAL AGAIN
    */

    const finalSubtotal = finalItems.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    /*
    DELIVERY
    */

    const finalDeliveryCharge =
      district.toLowerCase().includes("dhaka")
        ? 60
        : 100;

    /*
    TOTAL
    */

    const finalTotal =
      finalSubtotal + finalDeliveryCharge;

    /*
    TOP LEVEL PRODUCT
    */

    const firstItem = finalItems[0];

    const orderData = {
      name,
      phone,
      district,
      thana,
      address,
      note,

      /*
      TOP LEVEL PRODUCT INFO
      */

      productId: isBuyNow
        ? firstItem.productId
        : null,

      productName: isBuyNow
        ? firstItem.productName
        : "",

      productImage: isBuyNow
        ? firstItem.productImage
        : "",

      price: isBuyNow
        ? firstItem.price
        : 0,

      quantity: isBuyNow
        ? firstItem.quantity
        : 1,

      /*
      CART ITEMS
      */

      items: finalItems,

      /*
      MONEY
      */

      subtotal: finalSubtotal,

      deliveryCharge:
        finalDeliveryCharge,

      total: finalTotal,

      /*
      ORDER INFO
      */

      source: "website",

      orderSource: "website",
    };

    console.log(
      "================================="
    );

    console.log(
      "ORDER DATA:",
      orderData
    );

    console.log(
      "ORDER ITEMS:",
      finalItems
    );

    console.log(
      "SUBTOTAL:",
      finalSubtotal
    );

    console.log(
      "DELIVERY:",
      finalDeliveryCharge
    );

    console.log(
      "TOTAL:",
      finalTotal
    );

    console.log(
      "================================="
    );

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify(
            orderData
          ),
        }
      );

      /*
      READ RAW RESPONSE FIRST
      */

      const responseText =
        await response.text();

      console.log(
        "HTTP STATUS:",
        response.status
      );

      console.log(
        "RAW RESPONSE:",
        responseText
      );

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch (jsonError) {
        console.error(
          "JSON PARSE ERROR:",
          jsonError
        );
      }

      /*
      BACKEND ERROR
      */

      if (!response.ok) {
        const backendMessage =
          data?.message ||
          data?.error ||
          responseText ||
          `HTTP ${response.status}`;

        throw new Error(
          backendMessage
        );
      }

      /*
      SUCCESS
      */

      console.log(
        "ORDER CREATED:",
        data
      );

      alert(
        "Order placed successfully! 🎉"
      );

      /*
      CLEAR CART
      */

      if (!isBuyNow) {
        dispatch(clearCart());
      }

      /*
      GO HOME
      */

      navigate("/");
    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error
      );

      alert(
        `Order failed!\n\n${
          error?.message ||
          "Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  ========================================
  NO PRODUCT / EMPTY CART
  ========================================
  */

  if (!isBuyNow && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">
            Your cart is empty
          </h2>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-3 rounded-lg bg-black text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /*
  ========================================
  UI
  ========================================
  */

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >

          {/* =================================
              CUSTOMER INFORMATION
          ================================= */}

          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">

            <h2 className="text-xl font-semibold mb-6">
              Customer Information
            </h2>

            {/* NAME */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <div className="relative">

                <FiUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

              </div>

            </div>

            {/* PHONE */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>

              <div className="relative">

                <FiPhone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01712345678"
                  maxLength={11}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />

              </div>

            </div>

            {/* DISTRICT */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                District
              </label>

              <div className="relative">

                <FiMapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 bg-white outline-none focus:ring-2 focus:ring-black"
                >

                  <option value="">
                    Select District
                  </option>

                  {districtData.map(
                    (item, index) => (
                      <option
                        key={
                          item.district ||
                          item.name ||
                          index
                        }
                        value={
                          item.district ||
                          item.name
                        }
                      >
                        {item.district ||
                          item.name}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* THANA */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Thana
              </label>

              <div className="relative">

                <FiMapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <select
                  name="thana"
                  value={formData.thana}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className="w-full border rounded-xl pl-10 pr-4 py-3 bg-white outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                >

                  <option value="">
                    {formData.district
                      ? "Select Thana"
                      : "Select District First"}
                  </option>

                  {thanaList.map(
                    (thana, index) => (
                      <option
                        key={`${thana}-${index}`}
                        value={
                          typeof thana ===
                          "string"
                            ? thana
                            : thana.name
                        }
                      >
                        {typeof thana ===
                        "string"
                          ? thana
                          : thana.name}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Delivery Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                placeholder="House, Road, Area..."
                className="w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
              />

            </div>

            {/* NOTE */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Note
              </label>

              <div className="relative">

                <FiFileText
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional note..."
                  className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
                />

              </div>

            </div>

          </div>

          {/* =================================
              ORDER SUMMARY
          ================================= */}

          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">

            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-5 mb-6">

              {orderItems.map(
                (item, index) => (

                  <div
                    key={`${item.productId}-${index}`}
                    className="flex gap-4 border-b pb-5"
                  >

                    {/* IMAGE */}

                    <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">

                      {item.productImage ? (
                        <img
                          src={
                            item.productImage
                          }
                          alt={
                            item.productName
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                    </div>

                    {/* INFO */}

                    <div className="flex-1">

                      <h3 className="font-medium">
                        {item.productName ||
                          "Product"}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        ৳
                        {item.price.toFixed(
                          2
                        )} ×{" "}
                        {item.quantity}
                      </p>

                      <p className="font-semibold mt-1">
                        ৳
                        {item.subtotal.toFixed(
                          2
                        )}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* PRICE */}

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ৳
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Delivery Charge
                </span>

                <span className="font-medium">
                  ৳
                  {deliveryCharge.toFixed(
                    2
                  )}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold">

                <span>
                  Total
                </span>

                <span>
                  ৳
                  {total.toFixed(2)}
                </span>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">

              <p className="font-medium">
                Payment Method
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Cash on Delivery
              </p>

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-black text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;