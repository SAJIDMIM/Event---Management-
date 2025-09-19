require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(port, () => console.log(`🚀 Server started on port ${port}`));
