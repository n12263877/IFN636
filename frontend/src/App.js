import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import Navbar from "./components/Navbar";

// 🔥 USER PAGES
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
// 🔥 ADMIN PAGES
import AddProduct from "./pages/AddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";

// 🔥 OPTIONAL: SIMPLE 404 PAGE
const NotFound = () => (
  <div className="p-10 text-center">
    <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <Router>
      {/* 🔥 NAVBAR */}
      <Navbar />

      {/* 🔥 MAIN CONTENT WRAPPER */}
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* ================= USER ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/edit-product/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin-orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          {/* 🔥 FALLBACK */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
