const {
  addComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/comments");
const express = require("express");
const router = express.Router();

router.route("/").post(addComment);
router.route("/data").get(getAllComments);
router.route("/:id").patch(updateComment).delete(deleteComment);

module.exports = router;
