const db = require("../models/index");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.User.findOne({ where: { username } });

  if (user) {
    const isSuccess = bcryptjs.compareSync(password, user.password);

    if (isSuccess) {
      const token = jwt.sign(
        { id: user.id, name: user.name },
        process.env.SECRET,
        {
          expiresIn: 3600,
        }
      );

      res.status(200).send({ token, message: "Login successful." });
    } else {
      res.status(401).send({ message: "Invalid username or password" });
    }
  } else {
    res.status(401).send({ message: "Invalid username or password" });
  }
};

const signupUser = async (req, res) => {
  const { username, password, name } = req.body;
  const user = await db.User.findOne({ where: { username } });

  if (user) {
    res.status(400).send({ message: "Username already taken" });
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    await db.User.create({
      username,
      name,
      password: hashedPassword,
    });

    res.status(201).send({ message: "User created." });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
