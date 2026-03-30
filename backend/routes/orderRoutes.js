const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// 🔥 CREATE ORDER (USER)
router.post("/", protect, async (req, res) => {
  try {
    const { items, total, address, payment } = req.body;

    const order = new Order({
      user: req.user.name,
      items,
      total,
      address,
      payment,
    });

    const saved = await order.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 GET USER ORDERS
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.name });
  res.json(orders);
});

// 🔥 GET ALL ORDERS (ADMIN)
router.get("/", protect, adminOnly, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// 🔥 UPDATE ORDER STATUS (ADMIN)
router.put("/:id", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );

  res.json(order);
});

// 🔥 DELETE ORDER (ADMIN)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

module.exports = router;
