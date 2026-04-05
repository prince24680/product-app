const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/mern_demo");

// Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model("Product", ProductSchema);

// Routes

// Create product
app.post("/add", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send("Product added");
});

// Get all products
app.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/add", async (req, res) => {
  const { name, price } = req.body;

  const newProduct = new Product({
    name,
    price
  });

  await newProduct.save();
  res.send("Product Added");
});
app.delete("/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});
app.delete("/delete/:id", async (req, res) => {
  console.log("Deleting:", req.params.id);

  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});
app.put("/update/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price
  });

  res.send("Updated");
});
app.put("/update/:id", async (req, res) => {
  console.log("Updating:", req.params.id);

  await Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price
  });

  res.send("Updated");
});