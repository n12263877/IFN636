import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Laptops</h1>
          <p className="text-gray-500">
            Manage your laptop products efficiently
          </p>
        </div>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Laptop
        </button>
      </div>

      {/* 🔥 SEARCH */}
      <div className="mb-4">
        <input
          placeholder="Search laptops..."
          className="border p-2 w-full max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🔥 TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-t">
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={p.image}
                    className="h-14 w-14 object-cover rounded"
                  />
                </td>

                {/* NAME */}
                <td className="p-3 font-semibold">{p.name}</td>

                {/* BRAND */}
                <td className="p-3">{p.brand}</td>

                {/* PRICE */}
                <td className="p-3">${p.price}</td>

                {/* STOCK */}
                <td className="p-3">
                  {p.stock > 0 ? (
                    <span className="text-green-600">{p.stock}</span>
                  ) : (
                    <span className="text-red-500">Out</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/edit-product/${p._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <p className="p-4 text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
