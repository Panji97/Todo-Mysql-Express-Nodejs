const {
  getAllActivity,
  createActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controller/activityController");
const express = require("express");

const router = express.Router();

router.route("/activity-groups").get(getAllActivity).post(createActivity);

router
  .route("/activity-groups/:id")
  .get(getActivityById)
  .put(updateActivity)
  .delete(deleteActivity);

module.exports = router;
