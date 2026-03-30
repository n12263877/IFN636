import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsRes = await axios.get("/products");
      const ordersRes = await axios.get("/orders");

      const totalRevenue = ordersRes.data.reduce((sum, o) => sum + o.total, 0);

      setStats({
        products: productsRes.data.length,
        orders: ordersRes.data.length,
        users: 0, // can add later
        revenue: totalRevenue,
      });

      setOrders(ordersRes.data.slice(0, 5)); // latest 5
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* 🔥 SIDEBAR */}
      <div className="w-60 bg-black text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        <p onClick={() => navigate("/admin")} className="cursor-pointer">
          🏠 Dashboard
        </p>

        <p
          onClick={() => navigate("/admin/products")}
          className="cursor-pointer"
        >
          💻 Products
        </p>

        <p onClick={() => navigate("/admin-orders")} className="cursor-pointer">
          📦 Orders
        </p>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="text-right">
            <p className="font-semibold">Admin User</p>
            <button
              onClick={() => navigate("/profile")}
              className="text-sm text-blue-500"
            >
              Profile
            </button>
          </div>
        </div>

        {/* 🔥 STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 border rounded">
            <h3>Total Products</h3>
            <p className="text-xl font-bold">{stats.products}</p>
          </div>

          <div className="p-4 border rounded">
            <h3>Total Orders</h3>
            <p className="text-xl font-bold">{stats.orders}</p>
          </div>

          <div className="p-4 border rounded">
            <h3>Total Users</h3>
            <p className="text-xl font-bold">{stats.users}</p>
          </div>

          <div className="p-4 border rounded">
            <h3>Revenue</h3>
            <p className="text-xl font-bold">${stats.revenue}</p>
          </div>
        </div>

        {/* 🔥 QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => navigate("/add-product")}
            className="p-6 bg-blue-500 text-white rounded cursor-pointer"
          >
            Add Product
          </div>

          <div
            onClick={() => navigate("/admin/products")}
            className="p-6 bg-green-500 text-white rounded cursor-pointer"
          >
            Manage Products
          </div>

          <div
            onClick={() => navigate("/admin-orders")}
            className="p-6 bg-purple-500 text-white rounded cursor-pointer"
          >
            View Orders
          </div>
        </div>

        {/* 🔥 RECENT ORDERS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

          <div className="border rounded">
            {orders.length === 0 ? (
              <p className="p-4">No orders yet</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="p-3 border-b flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{order.user}</p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} items
                    </p>
                  </div>

                  <div className="text-right">
                    <p>${order.total}</p>
                    <p className="text-sm">{order.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
