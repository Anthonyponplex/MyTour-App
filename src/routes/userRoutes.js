const express = require("express");
const { signup } = require("../controllers/authController");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/signup").post(signup);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
