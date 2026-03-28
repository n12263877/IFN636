import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosConfig";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    ram: "",
    storage: "",
    processor: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.get(`/products/${id}`);
    setFormData(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/products/${id}`, formData);
    alert("Product updated!");
    navigate("/products");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Laptop</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="ram"
          value={formData.ram}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="processor"
          value={formData.processor}
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
