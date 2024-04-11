const CustomError = require("../errors/custom-error");
const db = require("../models");
const Comment = db.comment;
const { StatusCodes } = require("http-status-codes");
const {
  sortCommentsIntoMap,
  addChildCommentsToParent,
  setTopComments,
} = require("../utils");
const MockComment = require("../classes/MockComment");

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

  const mockComments = [];
  for (const cmt of allComments) {
    mockComments.push(
      new MockComment(
        cmt.id,
        cmt.text,
        cmt.postId,
        cmt.createdAt,
        cmt.updatedAt,
        cmt.UserId,
        cmt.CommentId,
        []
      )
    );
  }

  const sortedComments = sortCommentsIntoMap(mockComments);
  //console.log(sortedComments);
  addChildCommentsToParent(mockComments, sortedComments);
  console.log(sortedComments);
  //const topComments = setTopComments(sortedComments); //dunno about this , incearca doar cu sortedComments obtinut dupa addChildCommentsToParent sa constuiesti hierarhia

  //console.log(topComments[0].childCommets);
  res.status(StatusCodes.OK).json({ allComments });
};

const updateComment = (req, res) => {};

module.exports = { addComment, getAllComments, updateComment };
