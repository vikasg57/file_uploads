const uploadcloud = require("../middleware/uploadcloud")

const Image = require('../models/image.model')

const upload = require('../middleware/uploads')

const authorize = require('../middleware/authorize')

const fs = require('fs')

const path = require('path')

const express = require("express")

const router = express.Router()

router.post("/upload", uploadcloud.single("file"),(req, res) => {
    if(req.file === undefined)
    return res.send("select file first")
    console.log(req.file.filename)
    const imgUrl = `http://localhost:3500/file/${req.file.filename}`
    return res.send(imgUrl)
})

router.post("/docs" ,authorize, upload.single("file"), async (req,res)=>{
    try{

        let random = Math.random() * (999999) + 100000
        random = Math.floor(random)
        let image = {
        user_id:req.user._id,
        key : random,
        img :{
          data:fs.readFileSync(path.resolve("."+'/uploads/'+req.file.filename)),
          ContentType : 'image/png' 
        }
      }
      console.log(path.resolve("." + "/uploads/" + req.file.filename));

      const img =await Image.create(image)
      res.status(200).send({'key':image.key});

    }
    catch(er){
       res.status(500).send("error");
    }
})

router.get("/docs", authorize, async (req, res) => {
  const img = await Image.find({ user_id: req.user._id }).lean().exec();
  image=img.map((img) =>{ return {'data':img.img.data}})
  res.send(image);
});

module.exports = router;
