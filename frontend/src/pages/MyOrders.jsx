import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // 🔥 PROTECT PAGE
  useEffect(() => {
    if (!user) {
      alert("Please login to view your orders");
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      alert("Error fetching orders");
    }
  };

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-gray-500">View your order history</p>
      </div>

      {/* 🔥 EMPTY STATE */}
      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <p className="mb-4">You have no orders yet</p>

          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-2"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-sm">
              {/* TOP */}
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-semibold">
                    Order ID: {order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-white rounded text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <img
                        src={item.image}
                        className="h-12 w-12 object-cover rounded"
                        alt="product image"
                      />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty || 1}
                        </p>
                      </div>
                    </div>

                    <p>${item.price}</p>
                  </div>
                ))}
              </div>

              {/* BOTTOM */}
              <div className="flex justify-between mt-4 border-t pt-2">
                <p className="font-semibold">Total: ${order.total}</p>
                <p className="text-sm text-gray-500">
                  Payment: {order.payment}
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Address: {order.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
