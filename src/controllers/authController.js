let db = require("../models/db");

let argon = require("argon2");

let jwt = require("jsonwebtoken")

let registerUser = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email) {
    res.status(400).json("email is required");
    return;
  }

  let hash;
  try {
    hash = await argon.hash(password);
  } catch (err) {
    console.log("Failed to has the password");
    res.sendStatus(500);
    return;
  }

  let sql = "insert into todo_users (email, hash) values (?,?)";
  let params = [email, hash];

  db.query(sql, params, function (err, results) {
    if (err) {
      console.log("Failed", err);
    } else {
      results.sendStatus(204);
    }
  });
};

let loginUser = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  let sql = "select id, hash from todo_users where email = ?";
  let params = [email];

  db.query(sql, params, async function (err, results) {
    let storedHash;

    if (err) {
      console.log("Failed to fetch hash for user", err);
    } else if (results.length > 1) {
      console.log("error", email);
    } else if (results.length == 1) {
      storedHash = results[0].hash;
    }

    try {
      let pass = await argon.verify(storedHash, password);
      if (pass) {
        res.sendStatus(204);
        let token = {
          id: results[0].id,
          email: email
        }
        let signedToken = jwt.sign(token, process.env.JWT_SECRET, {expiresIn:86400})

        res.json(signedToken)
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.log("failed to verify hash", err);
      res.sendStatus(401);
      return;
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
};
