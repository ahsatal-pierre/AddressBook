const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {

  const { email } = req.body;
  if (!email) {
    return res.status(400).send({
      message: "Email is required."
    });
  }

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Email is already in use!"
        });
        return;
      }

      next();
    });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;
