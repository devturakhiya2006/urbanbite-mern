const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const mongoDB = require("../db");

router.post('/foodData', async (req, res) => {
  try {
    // If the database connection is disconnected or connecting, wait for it
    if (mongoose.connection.readyState !== 1) {
      await mongoDB();
    }

    // Fetch directly from MongoDB collections
    const foodItems = await mongoose.connection.db.collection("foods_item").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    res.send([foodItems, foodCategory]);
  } catch (error) {
    console.error("Error fetching food data:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
// const express = require("express")
// const router = express.Router()

// router.post('/foodData', (req, res) => {
//   try {
//     res.send([global.foods_item || [], global.foodCategory || []]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// })

// module.exports = router;