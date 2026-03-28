import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => navigate("/add-product")}
          className="p-6 bg-blue-500 text-white rounded cursor-pointer"
        >
          Add Product
        </div>

        <div
          onClick={() => navigate("/products")}
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
    </div>
  );
};

export default AdminDashboard;
