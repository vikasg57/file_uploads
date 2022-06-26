require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Image = require("../models/image.model")
const fs = require('fs')
const path = require('path')

const newToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user;
    user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user) {
      return res.status(400).send({ message: "email already exist" });
    }
    user = await User.create({first_name: req.body.first_name,
                                 email: req.body.email,
                                 last_name: req.body.last_name,
                                 mobile: req.body.mobile,
                                 password: req.body.password,
                                 pic:req.file.path});
    
    const token = newToken(user);
    res.status(200).send({ user, token });

  } catch (er) {
    res.status(500).send(er.message);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return res.send({ error: "email is invalid" });

    const match = user.checkpassword(req.body.password);
    console.log(match)
    
    if (!match) return res.send({ error: "Password is invalid" });
    let x = JSON.parse(JSON.stringify(user));

    const token = newToken(user);

    return res.send({ user, token });
  } catch (err) {
    return res.send({ error: "email/password is invalid" });
  }
};

module.exports = { register, login };
