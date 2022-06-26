const express = require('express')

const cors = require('cors')

require('dotenv').config()

const app = express()

const bodyParser = require("body-parser");

const connect = require('./config/db')

const {register, login} = require('./controller/auth.controller')

const uploadfile = require('./controller/file.controller')

const port = process.env.PORT || 3000

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/file", uploadfile)

app.post('/login', login)

app.post('/register', register)

app.get('/',(req, res)=> res.send({"message": "server running"}))

app.listen(port, async () => {
    connect()
  console.log(`listening on ${port}`);
});
