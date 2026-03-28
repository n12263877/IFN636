import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-4 bg-black text-white">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Laptop Store
        </h1>

        <div className="flex gap-4">
          <button onClick={() => navigate("/products")}>Products</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 px-3 py-1 rounded"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="text-center p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to Our Laptop Store</h1>
        <p className="mt-2">Explore the best laptops at unbeatable prices!</p>

        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-black text-white px-6 py-2"
        >
          Shop Now
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Gaming", "Business", "Student", "Ultrabook"].map((cat) => (
            <div key={cat} className="border p-4 text-center rounded">
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
