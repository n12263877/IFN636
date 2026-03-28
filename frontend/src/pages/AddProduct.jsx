import { useState } from "react";
import axios from "../axiosConfig";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    ram: "",
    storage: "",
    processor: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", formData);
      alert("Product Added!");
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Laptop</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="ram"
          placeholder="RAM"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="storage"
          placeholder="Storage"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="processor"
          placeholder="Processor"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button type="submit" className="bg-black text-white px-4 py-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
