const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const PORT = 8080;
var cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "robo_attendance",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MYSQL CONNECTED");
  }
});

app.post("/uploadFile", (req, res) => {
  const { userId, role, password } = req.body;

  db.query(
    "SELECT userId from users WHERE userId = ?",
    [userId],
    (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        res.json({ alert: "UserId Already Exists", message: false });
      } else {
        db.query(
          "INSERT INTO users SET ?",
          { userId: userId, password: password, role: role },
          (err, results) => {
            if (err) {
              console.log(err);
              res.json({ alert: "An error occurred", message: false });
            } else {
              const id = results.insertId;
              const token = jwt.sign({ id }, "This is my secret key for", {
                expiresIn: 90,
              });
              res.json({ message: true, token: token, alert: "successful" });
            }
          }
        );
      }
    }
  );
});

app.post("/loginUser", (req, res) => {
  const { userId, password } = req.body;
  db.query("SELECT * FROM users WHERE userId = ?", [userId], (err, results) => {
    if (err) {
      console.log(err);
      res.json({ alert: "An error occurred", message: false });
    } else if (!results.length || results[0].password !== password) {
      res.json({ alert: "ID and password are incorrect", message: false });
    } else {
      const id = results[0].id;
      const token = jwt.sign({ id }, "This is my secret key for", {
        expiresIn: 90,
      });
      res.json({
        message: true,
        alert: "successful",
        token: token,
        role: results[0].role,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
