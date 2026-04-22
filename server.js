const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { protect, adminOnly } = require("./middleware/authMiddleware");
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Profile Data",
    user: req.user
  });
});

app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin"
  });
});
// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => console.log(err));