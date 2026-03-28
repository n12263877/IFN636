import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <input
        placeholder="Search..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p._id} className="border p-4">
            <h2>{p.name}</h2>
            <p>${p.price}</p>

            <button
              onClick={() => addToCart(p)}
              className="bg-green-500 text-white px-2"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate(`/product/${p._id}`)}
              className="bg-black text-white px-2 ml-2"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
