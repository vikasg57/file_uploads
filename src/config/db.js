const mongoose = require('mongoose');

module.exports = async function connect() {
  try {
    await mongoose.connect(process.env.URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
}
