const Activity = require("../model/activity");

exports.getAllActivity = async (req, res) => {
  try {
    const response = await Activity.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const response = await Activity.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        id: req.params.id,
      },
    });

    if (!response) {
      res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${req.params.id} Not Found`,
        data: {},
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Success",
        data: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

exports.createActivity = async (req, res) => {
  const { title, email } = req.body;
  try {
    const data = await Activity.create({
      title,
      email,
    });

    const response = await Activity.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "deleted_at"] },
      where: {
        id: data.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "Title cannot be null",
    });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const data = await Activity.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!data)
      res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${req.params.id} Not Found`,
        data: {},
      });

    await Activity.update(req.body, {
      where: {
        id: data.id,
      },
    });
    const result = await Activity.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  const result = await Activity.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    await Activity.destroy({
      where: {
        id: result.id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: `Success`,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "Not Found",
      message: `Activity with ID ${req.params.id} Not Found`,
    });
  }
};
