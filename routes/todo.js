const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controller/todoController");
const express = require("express");

const router = express.Router();

router.route("/todo-items").get(getAllTodos).post(createTodo);

router
  .route("/todo-items/:id")
  .get(getTodoById)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = router;
