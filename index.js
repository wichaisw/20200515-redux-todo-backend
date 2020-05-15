require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const app = express();

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

require("./config/passport/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
