const Contact = require('../models/contact.model');

exports.createContact = (req, res) => {
  const userId = req.userId;
  const { firstname, lastname, phonenumber, address } = req.body;

  const contactData = {
    firstname: firstname || "",
    lastname: lastname || "",
    phonenumber: phonenumber || "",
    address: address || "",
  };

  const contact = new Contact({...contactData, userId});
  contact.save();

  res.status(200).send({
    message: "Contact created successfully!",
    contact,
  });
};

exports.readContact = (req, res) => {
  const userId = req.userId;

  Contact.getAll(userId)
    .then(contacts => {
      res.status(200).send(contacts);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};