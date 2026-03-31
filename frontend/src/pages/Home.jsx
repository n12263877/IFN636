import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data.slice(0, 4)); // only 4 items
  };

  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <div className="grid md:grid-cols-2 items-center p-10 bg-gray-100">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our Laptop Store
          </h1>
          <p className="mb-6 text-gray-600">
            Explore the best laptops at unbeatable prices!
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Shop Now
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          alt="Laptop"
          className="w-full rounded"
        />
      </div>

      {/* 🔥 BANNER / SLIDER */}
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <img
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
            className="rounded h-48 w-full object-cover"
            alt="image2"
          />
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            className="rounded h-48 w-full object-cover"
            alt="image1"
          />
          <img
            src="https://images.unsplash.com/photo-1587829741301-dc798b83add3"
            className="rounded h-48 w-full object-cover"
            alt="image2"
          />
        </div>
      </div>

      {/* 🔥 FEATURED PRODUCTS */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Featured Laptops</h2>
        <p className="text-gray-500 mb-4">
          Discover the latest brands and models in our store.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-4 py-2 mb-6"
        >
          View All
        </button>

        <div className="grid md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-3 rounded text-left">
              <img
                src={p.image || "https://via.placeholder.com/150"}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">
                {p.ram} | {p.processor}
              </p>

              <p className="font-bold mt-1">${p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 CATEGORIES */}
      <div className="p-6 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-2">Explore Laptop Categories</h2>
        <p className="text-gray-500 mb-6">
          Find the right laptop for your needs.
        </p>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              name: "Gaming",
              img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
              alt: "product image",
            },
            {
              name: "Business",
              img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
              alt: "product image",
            },
            {
              name: "Student",
              img: "https://images.unsplash.com/photo-1527430253228-e93688616381",
              alt: "product image",
            },
            {
              name: "Ultrabook",
              img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
              alt: "product image",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate("/products")}
              className="border p-4 rounded cursor-pointer hover:shadow"
            >
              <img
                src={cat.img}
                className="h-24 w-full object-cover rounded mb-2"
                alt="product image"
              />
              <h3 className="font-semibold">{cat.name} Laptops</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 FOOTER */}
      <div className="bg-black text-white p-6 mt-6 text-center">
        <p>Thank you for visiting our store!</p>

        <div className="mt-2">
          <span>Quick Links: </span>
          <span className="mx-2">Home</span>|
          <span className="mx-2">Laptops</span>|
          <span className="mx-2">Contact</span>
        </div>

        <p className="mt-2">Address: 123 Laptop Lane, Tech City</p>

        <p className="mt-2">© 2026 Laptop Store</p>
      </div>
    </div>
  );
};

export default Home;
