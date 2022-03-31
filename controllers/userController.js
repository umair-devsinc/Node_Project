const db = require("../models");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && firstName && lastName)) {
      res.status(400).json({ error: "All input is required" });
    }
    const userExist = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else {
      const user = await db.User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      res.status(200).send({ msg: "User Successfully Register" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz filled the data" });
    }
    const user = await db.User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (!user) {
      res.status(400).json({ error: "Plz enter correct email and password" });
    } else {
      let token = jwt.sign({ id: user.id.toString() }, process.env.SECRET_KEY);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: false,
      });
      res
        .status(200)
        .json({ id: user.id, message: "User Signin Successfully" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const find = async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.query.id,
      },
    });

    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwtoken", "", {
      expires: new Date(Date.now()),
      httpOnly: false,
    });
    res.status(200).json({ message: "Logout removed cookie" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  register,
  login,
  logout,
  find,
};
