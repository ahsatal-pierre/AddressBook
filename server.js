const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

const db = require("./models");

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync().then(() => {
    console.log('Start Db');
  });

/* for test: remove :
db.sequelize.sync().then(() => {
    console.log('Start Db');
  });
  and uncomment: 
  
const User = db.user;
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });

function initial() {

     User.create({
      username: "pierre",
      email: "pierre@pierre.com",
      password: bcrypt.hashSync("123", 8)
    });

    User.create({
      username: "maurice",
      email: "maurice@maurice.com",
      password: bcrypt.hashSync("123", 8)
    }); 

    User.create({
      username: "etienne",
      email: "etienne@etienne.com",
      password: bcrypt.hashSync("123", 8)
    }); 
  }
   */

  require('./routes/auth.routes')(app);
  require('./routes/user.routes')(app);
  const contactRoutes = require('./routes/contact.routes');
  app.use('/api/contact', contactRoutes);

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to pierre's application." });
  });
  
  
  module.exports = app;
