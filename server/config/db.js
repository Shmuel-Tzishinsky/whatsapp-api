const mongoose = require("mongoose");

const connectDB = async () => {
  const client = await mongoose
    .connect(
      `mongodb+srv://${process.env.USER_MONGOOSE}:${process.env.PASSWORD_MONGOOSE}@whatsapp.sap1pd6.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .catch((err) => {
      return console.log(err);
    });

  console.log("Connection success");
};

module.exports = connectDB;
