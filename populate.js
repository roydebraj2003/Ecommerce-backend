require("dotenv").config();
const connectDB = require("./db/connect");
const products = require("./model/model");

const jsonProduct = require("./products.json");

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await products.deleteMany();
    await products.create(jsonProduct);
    console.log("Successfully connected to database and populated with json");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
populate();
