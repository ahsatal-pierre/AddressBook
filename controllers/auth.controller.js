const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


function generateToken(user) {
  return jwt.sign({ id: user.id },
    config.secret,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 3600, // 1 hours
    });
}

exports.signup = (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }
  if(!password) {
    return res.status(400).send({message: "Password is required."})
  }

  User.create({
    email: email,
    password: bcrypt.hashSync(password, 8)
  })
  .then(user => {
    const token = generateToken(user);

    res.status(200).send({
      message: "User was registered successfully!",
      id: user.id,
      email: user.email,
      accessToken: token
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = generateToken(user);

    res.status(200).send({
      id: user.id,
      email: user.email,
      accessToken: token
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
