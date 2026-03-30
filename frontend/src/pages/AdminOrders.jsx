import { useEffect, useState } from "react";
import axios from "../axiosConfig";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get("/orders");
    setOrders(res.data);
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    await axios.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  // 🔥 DELETE ORDER
  const deleteOrder = async (id) => {
    const confirm = window.confirm("Delete this order?");
    if (!confirm) return;

    await axios.delete(`/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <p className="text-gray-500">View and manage all customer orders</p>
      </div>

      {/* 🔥 TABLE */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                {/* USER */}
                <td className="p-3 font-semibold">{order.user}</td>

                {/* ITEMS */}
                <td className="p-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="text-sm">
                      • {item.name} (x{item.qty || 1})
                    </div>
                  ))}
                </td>

                {/* TOTAL */}
                <td className="p-3 font-bold">${order.total}</td>

                {/* PAYMENT */}
                <td className="p-3">{order.payment}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center space-x-2">
                  {/* CHANGE STATUS */}
                  <button
                    onClick={() =>
                      updateStatus(
                        order._id,
                        order.status === "Pending" ? "Delivered" : "Pending",
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Toggle Status
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteOrder(order._id)}
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
        {orders.length === 0 && (
          <p className="p-4 text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
