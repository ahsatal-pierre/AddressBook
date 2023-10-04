const admin = require('firebase-admin');
const db = admin.database();

class Contact {
  constructor(firstname, lastname, phonenumber, address, userId) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
    this.address = address;
    this.userId = userId;
  }

  save() {
    const ref = db.ref(`contact/${this.userId}`);
    ref.push(this);
  }

  static getAll(userId) {
    const ref = db.ref(`contact/${userId}`);
    return new Promise((resolve, reject) => {
      ref.once('value', snapshot => {
        const contacts = snapshot.val();
        resolve(contacts);
      });
    });
  }
}

module.exports = Contact;
