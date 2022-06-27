const Image = require("../models/image.model");
const upload = require("../middleware/uploads");
const authorize = require("../middleware/authorize");
const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

router.post("/docs", authorize, upload.single("file"), async (req, res) => {
  try {
    let random = Math.random() * 999999 + 100000;
    random = Math.floor(random);
    let image = {
      user_id: req.user._id,
      key: random,
      img: {
        data: fs.readFileSync(
          path.resolve("." + "/uploads/" + req.file.filename)
        ),
        ContentType: ["image/png","image/jpeg", "image/jpg"],
      },
    };
    const img = await Image.create(image);
    console.log({"key":img.key})
    return res.send(image);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});

router.get("/docs/:key", authorize, async (req, res) => {
  try {
    let query = {
      user_id: req.user._id,
      key: req.params.key,
    };
    const img = await Image.findOne(query).lean().exec();
    res.status(200).send(img);
  } catch (er) {
    res.status(500).send(er.message);
  }
});

module.exports = router;
