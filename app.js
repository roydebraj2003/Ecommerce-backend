require("dotenv").config();
const express = require("express");
const app = express();
const productsRouter = require("./routes/routes");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");

const port = 3000;

app.use("/api/v1/products", productsRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`the server is listening on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
