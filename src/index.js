const express = require('express')

require('dotenv').config()

const app = express()

const multer = require('multer')

const Item = require('./models/image.model')

const connect = require('./config/db')

const authorize = require('./middleware/authorize')

const upload = require('./middleware/uploads')

const Grid = require('gridfs-stream')

const mongoose = require('mongoose')

const uploadfile = require('./controller/file.controller')

const port = process.env.PORT || 3000

app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );


let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("docs");
});

app.use("/file", uploadfile)

app.use("/file", uploadfile )

app.get("file/:filename", async (req, res) => {
    try{
        const file = await gfs.files.findOne({filename:req.params.filename})
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    }
    catch(er){
        res.send("not found")

    }
})

app.delete("/file/:filename", async(req, res)=>{
    try{
        await gfs.files.deleteOne({filename:req.params.filename});
        res.send("success")
    }
    catch(er){
        res.send("error")
    }
})

const {register, login} = require('./controller/auth.controller')

app.post('/login', login)

app.post('/register', upload.single("pic"), register)

app.get('/',(req, res)=> res.send({"message": "server running"}))

app.listen(port, async () => {
    connect()
  console.log(`listening on ${port}`);
});
