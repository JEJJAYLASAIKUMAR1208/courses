const db = require("../config/db");

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
};

exports.createUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
};
