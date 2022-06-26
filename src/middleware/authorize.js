const jwt = require("jsonwebtoken");

//function return for the verification of token of the user

const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return rej(err);

      res(user);
    });
  });
};

//Below function verfiying if token is provided by the user or not if provided then it is starting with bearer or not and if it starts with bearer then verification of token

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(400).send({
      message: "authorization token was not provided",
    });
  }

  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res.status(400).send({
      message: "authorization token not provided or was not valid",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  let user;

  try {
    user = await verifyToken(token);
  } catch (er) {
    return res.status(500).send(er.message);
  }

  req.user = user.user;

  console.log(req.user);

  

  return next();
};
