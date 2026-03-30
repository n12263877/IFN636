import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-3 flex justify-between items-center shadow">
      {/* 🔥 LEFT (LOGO) */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        Laptop Store
      </Link>

      {/* 🔥 CENTER (NAV LINKS) */}
      <div className="flex items-center gap-6 text-sm font-medium">
        {/* COMMON */}
        <Link className="hover:text-gray-300" to="/">
          Home
        </Link>

        <Link className="hover:text-gray-300" to="/products">
          Products
        </Link>

        {/* 🔥 USER LINKS */}
        {user && user.role === "user" && (
          <>
            <Link className="hover:text-gray-300" to="/my-orders">
              My Orders
            </Link>
          </>
        )}

        {/* 🔥 ADMIN LINKS */}
        {user && user.role === "admin" && (
          <>
            <Link className="hover:text-gray-300" to="/admin">
              Dashboard
            </Link>

            <Link className="hover:text-gray-300" to="/admin/products">
              Products
            </Link>

            <Link className="hover:text-gray-300" to="/admin-orders">
              Orders
            </Link>
          </>
        )}
      </div>

      {/* 🔥 RIGHT (ACTIONS) */}
      <div className="flex items-center gap-5">
        {/* 🔥 CART (ALWAYS) */}
        <Link to="/cart" className="relative">
          <FaShoppingCart size={20} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* 🔥 NOT LOGGED IN */}
        {!user && (
          <>
            <Link className="hover:text-gray-300" to="/login">
              Login
            </Link>

            <Link
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              to="/register"
            >
              Signup
            </Link>
          </>
        )}

        {/* 🔥 LOGGED IN */}
        {user && (
          <>
            <Link to="/profile" className="flex items-center gap-2">
              <FaUserCircle size={20} />
              <span className="text-sm">{user.name}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
