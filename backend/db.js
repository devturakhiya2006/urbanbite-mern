const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully");
    const fetched_data = mongoose.connection.db.collection("foods_item");
    const data = await fetched_data.find({}).toArray();

    // Fetch food categories
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    global.foods_item = data;
    global.foodCategory = catData;
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

module.exports = mongoDB;

// const mongoose = require("mongoose");
// // The password is now correctly inserted between the colon and the @ symbol
// //const mongoURI = "mongodb://urbanbite:UrbanBite%402026@ac-l8obyvq-shard-00-00.kt3rz7h.mongodb.net:27017,ac-l8obyvq-shard-00-01.kt3rz7h.mongodb.net:27017,ac-l8obyvq-shard-00-02.kt3rz7h.mongodb.net:27017/?ssl=true&replicaSet=atlas-166u8a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=urbanbite-db";
// const mongoURI =   "mongodb://urbanbite:UrbanBite%402026@ac-l8obyvq-shard-00-00.kt3rz7h.mongodb.net:27017,ac-l8obyvq-shard-00-01.kt3rz7h.mongodb.net:27017,ac-l8obyvq-shard-00-02.kt3rz7h.mongodb.net:27017/urbanbite?ssl=true&replicaSet=atlas-166u8a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=urbanbite-db";

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log(" MongoDB Connected Successfully");
//     const fetched_data = mongoose.connection.db.collection("foods_item");
//     const data = await fetched_data.find({}).toArray();

//     // Fetch food categories
//     const foodCategory= mongoose.connection.db.collection("foodCategory");
//     const catData = await foodCategory.find({}).toArray();

//     global.foods_item=data
//     global.foodCategory = catData;
//   } catch (err) {

//     console.error(" MongoDB Connection Error:", err);
//   }
// };
// module.exports = mongoDB;