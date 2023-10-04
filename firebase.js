const admin = require('firebase-admin');
const serviceAccount = require('./fireCreds.json');

 const databaseURL = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:9000/?ns=strv-addressbook-asathal-pier'
  : 'https://strv-addressbook-asathal-pier-default-rtdb.europe-west1.firebasedatabase.app'; 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const db = admin.database();

module.exports = db;

