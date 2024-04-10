const CustomError = require("../errors/custom-error");
const db = require("../models");
const Comment = db.comment;
const { StatusCodes } = require("http-status-codes");
const { sortCommentsIntoMap } = require("../utils");

const addComment = async (req, res) => {
  const { text, postId, CommentId } = req.body;

  const UserId = req.user.userId;

  if (CommentId) {
    const parentComment = await Comment.findOne({
      where: { id: CommentId },
    });

    if (!parentComment) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "Parent commnent id does not exist"
      );
    }
    await Comment.create({
      text,
      postId: postId,
      UserId,
      CommentId: parentComment.id,
    });
  } else {
    await Comment.create({ text, postId: postId, UserId, CommentId: null });
  }

  return res.status(StatusCodes.OK).send({ id: "Comment added succesfully" });
};

const getAllComments = async (req, res) => {
  const { postId } = req.body;

  const allComments = await Comment.findAll({ where: { postId: postId } });

  const sortedComments = sortCommentsIntoMap(allComments);
  console.log(sortedComments);
  res.status(StatusCodes.OK).json({ sortedComments });
};

module.exports = { addComment, getAllComments };
