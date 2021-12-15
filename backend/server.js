import express from "express";
import mongoose from "mongoose";
// import data from "./data.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona");

app.use("/api/products", productRouter);

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
