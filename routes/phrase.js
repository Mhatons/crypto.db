const express = require("express");
const router = express.Router();

const {
  createData,
  getAllPhrase,
  deleteOnePhrase,
  deleteMany,
} = require("../controller/phrase");

router.route("/").post(createData);
router.route("/").get(getAllPhrase);
router.route("/del/:id").delete(deleteOnePhrase);
router.route("/del").delete(deleteMany);

module.exports = router;
