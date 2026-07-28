const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post('/foodData', async (req, res) => {
  try {
    // Check if mongoose is connected, if not ensure connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: "Database not connected yet" });
    }

    // Directly fetch from MongoDB collections
    const foodItems = await mongoose.connection.db.collection("foods_item").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    res.send([foodItems, foodCategory]);
  } catch (error) {
    console.error("Error fetching food data:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;