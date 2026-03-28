import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeItem = (index) => {
    let updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="mt-4">Cart is empty</p>
      ) : (
        <>
          <div className="mt-4 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="border p-3 flex justify-between">
                <div>
                  <h2>{item.name}</h2>
                  <p>${item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-2"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h2 className="mt-4 font-bold">Total: ${total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white px-4 py-2 mt-4"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
