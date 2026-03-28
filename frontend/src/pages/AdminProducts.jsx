import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      <button
        onClick={() => navigate("/add-product")}
        className="bg-green-600 text-white px-4 py-2 mb-4"
      >
        Add Product
      </button>

      {products.map((p) => (
        <div key={p._id} className="border p-3 mb-2 flex justify-between">
          <div>
            <p>{p.name}</p>
            <p>${p.price}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit-product/${p._id}`)}
              className="bg-blue-500 text-white px-2"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-500 text-white px-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProducts;
