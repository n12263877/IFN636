import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    ram: "",
    storage: "",
    processor: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.name || !formData.price) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/products", formData);

      alert("Product Added Successfully!");
      navigate("/admin/products");
    } catch (err) {
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Laptop</h1>
        <p className="text-gray-500">
          Fill in the details to add a new product
        </p>
      </div>

      {/* 🔥 FORM */}
      <form onSubmit={handleSubmit} className="border p-6 rounded space-y-4">
        {/* NAME */}
        <div>
          <label className="block font-semibold">Laptop Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter laptop name"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* BRAND */}
        <div>
          <label className="block font-semibold">Brand</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter brand"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block font-semibold">Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* RAM */}
        <div>
          <label className="block font-semibold">RAM</label>
          <input
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            placeholder="e.g., 16GB"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* STORAGE */}
        <div>
          <label className="block font-semibold">Storage</label>
          <input
            name="storage"
            value={formData.storage}
            onChange={handleChange}
            placeholder="e.g., 512GB SSD"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* PROCESSOR */}
        <div>
          <label className="block font-semibold">Processor</label>
          <input
            name="processor"
            value={formData.processor}
            onChange={handleChange}
            placeholder="e.g., Intel i7"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="block font-semibold">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block font-semibold">Product Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full border p-2 rounded"
          />

          {/* 🔥 IMAGE PREVIEW */}
          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="mt-3 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
