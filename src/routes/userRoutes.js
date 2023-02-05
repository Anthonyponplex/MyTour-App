const express = require("express");
const {
  signup,
  login,
  protect,
  restrictTo,
  resetPassword,
  forgotPassword,
  updatePassword,
} = require("../controllers/authController");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

router.route("/updateMyPassword").patch(protect, updatePassword);

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteUser);

module.exports = router;
