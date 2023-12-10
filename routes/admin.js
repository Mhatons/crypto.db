const express = require("express");
const router = express.Router();

const { createAdmin, signInAdmin } = require("../controller/admin");

router.route("/create").post(createAdmin);
router.route("/signin").post(signInAdmin);

module.exports = router;
