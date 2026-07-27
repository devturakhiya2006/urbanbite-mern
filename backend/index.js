require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
const app = express();
const port = process.env.PORT || 5000; 

// Connect to MongoDB
mongoDB();

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",  // ✅ CHANGED: allow your deployed frontend URL too
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;