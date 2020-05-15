const express = require("express");
const todoController = require("../controllers/todo");
const passport = require("passport");
const router = express.Router();

const auth = passport.authenticate("jwt-authenticate", { session: false });

router.get("/", auth, todoController.getAllTodos);
router.post("/", auth, todoController.addTodo);
router.patch("/:id", auth, todoController.completeTodo);

module.exports = router;
