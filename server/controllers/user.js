const router = require("express").Router();
const { register, login, logout, getUserDetails } = require("../services/user");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/userDetails", authMiddleware, getUserDetails);

module.exports = router;
