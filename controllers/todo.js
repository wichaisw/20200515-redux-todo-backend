const db = require("../models/index");

const getAllTodos = async (req, res) => {
  const todos = await db.Todo.findAll({ where: { user_id: req.user.id } });

  res.status(200).send(todos);
};

const addTodo = async (req, res) => {
  const { topic, description } = req.body;

  const newTodo = await db.Todo.create({
    topic,
    description,
    isDone: false,
    user_id: req.user.id,
  });

  res.status(201).send(newTodo);
};

const completeTodo = async (req, res) => {
  const isDone = Boolean(Number(req.body.isDone));
  const todoId = req.params.id;

  const todo = await db.Todo.findOne({
    where: { id: todoId, user_id: req.user.id },
  });

  if (todo) {
    todo.update({
      isDone: isDone,
    });

    res.status(200).send({ message: `Todo has been updated` });
  } else {
    res.status(404).send({ message: "Not found" });
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  completeTodo,
};