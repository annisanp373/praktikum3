const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require('./models/user');

const app = express();
app.use(express.json());
app.use(cors());


// Menghubungkan ke database MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rute untuk login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email })
      .then(user => {
        if (user) {
          if (user.password === password) {
            res.json("Success");
          } else {
            res.json("The password is incorrect");
          }
        } else {
          res.json("No user found with the provided email");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json("An error occurred");
      });
  });

  // Rute untuk register
app.post('/register', (req, res) => {
    userModel.create(req.body)
      .then(user => res.json(user))
      .catch(err => {
        console.log(err);
        res.status(500).json("An error occurred");
      });
  });

  // Menjalankan server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });