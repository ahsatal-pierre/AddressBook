const express = require('express');
const { authJwt } = require("../middleware");
const db = require('../firebase');

const router = express.Router();

router.use(express.json());


router.post('/create', [authJwt.verifyToken], async (req, res) => {
    try {
      const { firstname, lastname, phonenumber, adress } = req.body;
      const userId = req.userId; 

    const contactData = {
      firstname: firstname || '',
      lastname: lastname || '',
      phonenumber: phonenumber || '',
      adress: adress || '',
    };
  
      db.ref('contact/' + userId).push(contactData, err => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('contact created successfully!');
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  

  router.get('/read', [authJwt.verifyToken], async (req, res) => {
    try {
      const userId = req.userId; 
  
      db.ref('contact/' + userId).once('value', snapshot => {
        res.send(snapshot.val());
      }, err => {
        res.status(500).send(err);
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
module.exports = router;