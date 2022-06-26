const mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({

  key: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});
module.exports = mongoose.model("image", ItemSchema);
