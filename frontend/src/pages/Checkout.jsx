import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    payment: "UPI",
  });

  // ✅ redirect if not logged in
  useEffect(() => {
    if (!user) {
      alert("Please login to checkout");
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // ✅ total
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address) {
      alert("Please fill all fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/orders", {
        user: user.name,
        items: cart,
        total,
        address: form.address,
        payment: form.payment,
      });

      alert("Order placed successfully!");

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/products");
    } catch (err) {
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* LEFT - FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        <h2 className="text-xl font-bold">Checkout</h2>

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <select
          value={form.payment}
          onChange={(e) => setForm({ ...form, payment: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="COD">Cash on Delivery</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      {/* RIGHT - ORDER SUMMARY */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 object-cover"
                    />
                    <span>{item.name}</span>
                  </div>

                  <span>${item.price}</span>
                </div>
              ))}
            </div>

            <hr className="my-4" />

            <h3 className="font-bold text-lg">Total: ${total}</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
