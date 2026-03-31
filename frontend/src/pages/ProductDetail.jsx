import { useEffect, useState } from "react";
import {
  FaBatteryFull,
  FaDesktop,
  FaHdd,
  FaMemory,
  FaMicrochip,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosConfig";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      alert("Error loading product");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ADD TO CART
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to cart");
  };

  // 🔥 BUY NOW → go checkout
  const buyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div>
      {/* 🔥 HERO */}
      <div className="grid md:grid-cols-2 p-10 bg-gray-100 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-3">High-Performance Laptop</h1>

          <p className="text-gray-600 mb-4">
            Discover the power of technology with this laptop.
          </p>

          <div className="flex gap-3">
            <button onClick={buyNow} className="bg-gray-300 px-4 py-2">
              Buy Now
            </button>

            <button
              onClick={addToCart}
              className="bg-black text-white px-4 py-2"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <img
          src={product.image}
          className="w-full h-80 object-cover rounded"
          alt="product image"
        />
      </div>

      {/* 🔥 DETAILS */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Laptop Details</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p>${product.price}</p>
          </div>

          <div className="border p-4">
            <h3 className="font-semibold">View Gallery</h3>
            <p>More images coming soon</p>
          </div>
        </div>
      </div>

      {/* 🔥 OVERVIEW */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product Overview</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border p-4">
            <h3 className="font-semibold">Product Description</h3>
            <p>
              This laptop offers high-speed performance with its latest
              processor and powerful components.
            </p>
          </div>

          <div className="border p-4">
            <h3 className="font-semibold">Key Specifications</h3>
            <p>
              Includes {product.processor}, {product.ram}, and {product.storage}
              .
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 SPECIFICATIONS WITH ICONS */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <FaMicrochip size={30} className="mx-auto" />
            <p>Processor</p>
            <p className="font-bold">{product.processor}</p>
          </div>

          <div>
            <FaBatteryFull size={30} className="mx-auto" />
            <p>Battery</p>
            <p className="font-bold">10 hours</p>
          </div>

          <div>
            <FaDesktop size={30} className="mx-auto" />
            <p>Display</p>
            <p className="font-bold">15.6 inches</p>
          </div>

          <div>
            <FaHdd size={30} className="mx-auto" />
            <p>Storage</p>
            <p className="font-bold">{product.storage}</p>
          </div>

          <div>
            <FaMemory size={30} className="mx-auto" />
            <p>RAM</p>
            <p className="font-bold">{product.ram}</p>
          </div>
        </div>
      </div>

      {/* 🔥 REVIEWS */}
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {[
          "Amazing performance, highly recommend!",
          "Very fast and reliable laptop.",
          "Value for money, impressed!",
        ].map((review, i) => (
          <div key={i} className="border p-3 mb-3 bg-white">
            ⭐⭐⭐⭐⭐
            <p>{review}</p>
          </div>
        ))}
      </div>

      {/* 🔥 CUSTOMER SUPPORT */}
      <div className="p-6 bg-gray-800 text-white flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Customer Support</h3>
          <p>Need help with your purchase?</p>
        </div>

        <button
          onClick={() => navigate("/contact")}
          className="bg-black px-4 py-2"
        >
          Contact Us
        </button>
      </div>

      {/* 🔥 FOOTER */}
      <div className="bg-black text-white p-6 text-center">
        <p>Contact: support@laptopstore.com</p>
        <p>Privacy Policy | Terms of Service</p>
        <p>Follow us on social media</p>
      </div>
    </div>
  );
};

export default ProductDetail;
