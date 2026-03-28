import { useState } from "react";
import axios from "../axiosConfig";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    await axios.post("/orders", {
      user: form.name,
      items: cart,
      total,
      address: form.address,
      payment: form.payment,
    });

    alert("Order placed!");
    localStorage.removeItem("cart");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <select onChange={(e) => setForm({ ...form, payment: e.target.value })}>
        <option>Card</option>
        <option>UPI</option>
      </select>
      <button>Place Order</button>
    </form>
  );
};

export default Checkout;
