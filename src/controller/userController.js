const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const User = require("../models/usersModel");

exports.userRegister = async (req, res) => {
  const { fullname, email, password, institution, role } = req.body;
  // Validate input
  if (!fullname || !email || !password || !institution) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if user already exists
  // const userExists = await User.findOne({ where: { email } });

  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
  const sql =
    "INSERT INTO users (fullname, email, password, institution, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
  db.query(
    sql,
    [fullname, email, hashedPassword, institution, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "User registered" });
    }
  );
};

exports.userLogin = (req, res) => {
  const { email, password } = req.body;
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // Check if user exists
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", user, token });
  });
};

exports.getAllUsers = (req, res) => {
  const sql = "SELECT fullname, email, role FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const sql =
    "SELECT fullname, email, institution, role FROM users WHERE id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  });
};
