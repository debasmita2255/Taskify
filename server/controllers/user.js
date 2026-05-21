const router = require("express").Router();
const { register } = require("../services/user"); // this is object destructuring

router.post("/register", register);

module.exports = router;