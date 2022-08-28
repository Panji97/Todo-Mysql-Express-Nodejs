const Todo = require("../model/todo");
const Activity = require("../model/activity");

exports.getAllTodos = async (req, res) => {
  try {
    const response = await Todo.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "ActivityId"],
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const response = await Todo.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt", "ActivityId"],
      },
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createTodo = async (req, res) => {
  const { title, priority } = req.body;
  try {
    let dataId = await Activity.findOne({});
    const response = await Todo.create({
      title,
      priority,
      activity_group_id: dataId.id,
    });
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const dataId = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    await Todo.update(req.body, {
      where: {
        id: dataId.id,
      },
    });
    const result = await Todo.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "ActivityId"] },
    });
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  let result;
  result = await Todo.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    await Todo.destroy({
      where: {
        id: result.id,
      },
    });
    result = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(404).json({
      status: "Success",
      message: `Seccess`,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "Not Found",
      message: `Activity with ID ${req.params.id} Not Found`,
    });
  }
};
