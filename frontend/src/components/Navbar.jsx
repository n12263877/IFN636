import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-xl font-bold">
        Laptop Store
      </Link>

      {/* MENU */}
      <div className="flex items-center gap-4">
        {/* USER LOGGED IN */}
        {user ? (
          <>
            {/* NORMAL USER */}
            {user.role === "user" && (
              <>
                <Link to="/products" className="hover:text-gray-300">
                  Products
                </Link>

                <Link to="/cart" className="hover:text-gray-300">
                  Cart
                </Link>
              </>
            )}

            {/* ADMIN */}
            {user.role === "admin" && (
              <>
                <Link to="/admin" className="hover:text-gray-300">
                  Dashboard
                </Link>

                <Link to="/admin/products" className="hover:text-gray-300">
                  Manage Products
                </Link>

                <Link to="/admin-orders" className="hover:text-gray-300">
                  Orders
                </Link>
              </>
            )}

            {/* COMMON */}
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* NOT LOGGED IN */}
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
