const express = require("express");
const userControllers = require("../controllers/user");
const router = express.Router();

router.post("/login", userControllers.loginUser);
router.post("/signup", userControllers.signupUser);

module.exports = router;
