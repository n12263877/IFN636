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

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-3 rounded">
          <p>
            <b>User:</b> {order.user}
          </p>
          <p>
            <b>Total:</b> ${order.total}
          </p>
          <p>
            <b>Address:</b> {order.address}
          </p>
          <p>
            <b>Payment:</b> {order.payment}
          </p>

          <div className="mt-2">
            <b>Items:</b>
            {order.items.map((item, i) => (
              <p key={i}>- {item.name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
