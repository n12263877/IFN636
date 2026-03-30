import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    ram: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  // 🔥 ADD TO CART (MERGE LOGIC)
  const addToCart = (product) => {
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

  // 🔥 FILTER LOGIC
  let filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (filters.brand ? p.brand === filters.brand : true))
    .filter((p) => (filters.ram ? p.ram === filters.ram : true));

  // 🔥 SORTING
  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Find Your Perfect Laptop</h1>
        <p className="text-gray-500">
          Explore our selection of laptops tailored for every need.
        </p>
      </div>

      {/* 🔥 SEARCH */}
      <div className="flex justify-center mb-6">
        <input
          placeholder="Search laptops..."
          className="border p-2 w-full max-w-md"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔥 CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-6">
        {["All", "Gaming", "Business", "Student", "Ultrabook"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 border ${
              category === cat ? "bg-black text-white" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* 🔥 FILTER SIDEBAR */}
        <div className="border p-4 space-y-4">
          <h2 className="font-bold">Filters</h2>

          {/* BRAND */}
          <div>
            <p className="font-semibold">Brand</p>
            <select
              className="w-full border p-1"
              onChange={(e) =>
                setFilters({ ...filters, brand: e.target.value })
              }
            >
              <option value="">All</option>
              <option>Dell</option>
              <option>HP</option>
              <option>Lenovo</option>
              <option>Asus</option>
            </select>
          </div>

          {/* RAM */}
          <div>
            <p className="font-semibold">RAM</p>
            <select
              className="w-full border p-1"
              onChange={(e) => setFilters({ ...filters, ram: e.target.value })}
            >
              <option value="">All</option>
              <option>8GB</option>
              <option>16GB</option>
              <option>32GB</option>
            </select>
          </div>

          {/* SORT */}
          <div>
            <p className="font-semibold">Sort By</p>
            <select
              className="w-full border p-1"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>
          </div>
        </div>

        {/* 🔥 PRODUCTS GRID */}
        <div className="md:col-span-3 grid md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p._id} className="border p-3 rounded">
              <img
                src={p.image || "https://via.placeholder.com/150"}
                alt={p.name}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">
                {p.ram} | {p.processor}
              </p>

              <p className="font-bold mt-1">${p.price}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(p)}
                  className="bg-green-500 text-white px-2 py-1 w-full"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="bg-black text-white px-2 py-1 w-full"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
