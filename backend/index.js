require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoDB();

// ✅ Define all allowed origins (Local + Vercel deployments + Environment Variable)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://urbanbite-mern-h6on.vercel.app",
  "https://urbanbite-food.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean); // Removes undefined/null if FRONTEND_URL is not set

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
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

// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",  // ✅ CHANGED: allow your deployed frontend URL too
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));