const express = require("express");
const {registerUser,loginUser, logoutUser} = require("../controller/userController")
const {isAuthenticatedUser} = require("../middleware/auth")

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);


module.exports = router;