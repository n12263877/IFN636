import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // update navbar
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // 🔥 REMOVE ITEM
  const removeItem = (index) => {
    let updated = [...cart];
    updated.splice(index, 1);
    updateCart(updated);
  };

  // 🔥 INCREASE QTY
  const increaseQty = (index) => {
    let updated = [...cart];
    updated[index].qty = (updated[index].qty || 1) + 1;
    updateCart(updated);
  };

  // 🔥 DECREASE QTY
  const decreaseQty = (index) => {
    let updated = [...cart];

    if ((updated[index].qty || 1) > 1) {
      updated[index].qty -= 1;
    } else {
      updated.splice(index, 1);
    }

    updateCart(updated);
  };

  // 🔥 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0,
  );

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <p className="text-gray-500 mb-6">
        Review your selected items before checkout
      </p>

      {cart.length === 0 ? (
        <div className="text-center mt-10">
          <p className="mb-4">Your cart is empty</p>

          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white px-6 py-2"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* 🔥 ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="border p-4 flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    className="h-20 w-20 object-cover rounded"
                    alt="product image"
                  />

                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>${item.price}</p>

                    {/* 🔥 QTY CONTROLS */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(index)}
                        className="px-2 bg-gray-300"
                      >
                        -
                      </button>

                      <span>{item.qty || 1}</span>

                      <button
                        onClick={() => increaseQty(index)}
                        className="px-2 bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* 🔥 RIGHT SIDE */}
                <div className="text-right">
                  <p className="font-bold">
                    ${(item.price * (item.qty || 1)).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🔥 SUMMARY */}
          <div className="border p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <p className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </p>

            <p className="flex justify-between mb-4 font-bold">
              <span>Total Price:</span>
              <span>${total.toFixed(2)}</span>
            </p>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-black text-white w-full py-2 mb-2"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/products")}
              className="border w-full py-2"
            >
              Add More Items
            </button>
          </div>
        </div>
      )}

      {/* 🔥 FOOTER */}
      <div className="mt-10 text-center text-gray-500">
        <p>Customer Support | Store Policies | Follow Us</p>
      </div>
    </div>
  );
};

export default Cart;
