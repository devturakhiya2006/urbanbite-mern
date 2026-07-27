const express = require("express")
const router = express.Router()

router.post('/foodData', (req, res) => {
  try {
    res.send([global.foods_item || [], global.foodCategory || []]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
})

module.exports = router;