const db = require("../models");
const User = db.user;
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };

  // test unique user
  exports.getUserById = (req, res) => {
    const userId = req.params.userId;
  
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
  
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getUserByEmail = (req, res) => {
    const email = req.params.email;
  
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
  
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };