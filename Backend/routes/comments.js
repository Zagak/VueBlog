const { addComment, getAllComments } = require("../controllers/comments");
const express = require("express");
const router = express.Router();

router.route("/").post(addComment).get(getAllComments);

module.exports = router;
