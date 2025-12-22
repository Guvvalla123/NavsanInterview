const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const app = express();
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
