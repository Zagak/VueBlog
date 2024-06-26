const { register, login, token } = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/token", token);

module.exports = router;
