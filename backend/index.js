require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://urbanbite-mern-h6on.vercel.app",
//   "https://urbanbite-food.vercel.app",
//   process.env.FRONTEND_URL
// ].filter(Boolean);

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

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