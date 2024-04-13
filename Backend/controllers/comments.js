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
  const { postId } = req.query;

  async function getCommentHierarchy() {
    try {
      const sqlQuery = `
      WITH RECURSIVE CommentTree AS (
        SELECT 
          c.id, 
          c."CommentId" AS parent_id, 
          c.text, 
          u.name,
          c."UserId", 
          c."postId", 
          c."createdAt", 
          c."updatedAt",
          1 AS LEVEL
          FROM "Comments" c
          JOIN "Users" u ON c."UserId" = u."id"
          WHERE c."CommentId" IS NULL AND c."postId" = ${postId}

        UNION ALL
      
        SELECT 
          c.id, 
          c."CommentId",
          c.text,
          u.name,
          c."UserId", 
          c."postId", 
          c."createdAt", 
          c."updatedAt",
          ct.LEVEL + 1
          FROM "Comments" c
          JOIN CommentTree ct ON ct.id = c."CommentId"
          JOIN "Users" u ON c."UserId" = u."id"
          WHERE c."postId" = ${postId}
      )
      SELECT * FROM CommentTree ORDER BY "createdAt";           
`;

      const result = await db.sequelize.query(sqlQuery);
      console.log(result);
      const nestComments = (comments, parentId = null) => {
        return comments
          .filter((comment) => comment.parent_id === parentId)
          .map((comment) => ({
            ...comment,
            children: nestComments(comments, comment.id),
          }));
      };

      return nestComments(result[0]);
    } catch (error) {
      throw new CustomError(StatusCodes.BAD_GATEWAY, "Error executing SQL");
    }
  }

  const nestedComments = await getCommentHierarchy();
  res.status(StatusCodes.OK).json({ nestedComments });
};

const updateComment = async (req, res) => {
  const { userId } = req.user;
  const { id: CommentId } = req.params;
  const { newText } = req.body;

  const { UserId: userOfComment } = await Comment.findOne({
    where: { id: CommentId },
  });

  if (userOfComment === userId) {
    await Comment.update({ text: newText }, { where: { id: CommentId } });

    return res.status(StatusCodes.OK).send("Comment modified succesfully");
  }

  throw new CustomError(StatusCodes.FORBIDDEN, "Cannot modify the comment");
};

const deleteComment = async (req, res) => {
  const { userId } = req.user;
  const { id: CommentId } = req.params;

  const { UserId: userOfComment } = await Comment.findOne({
    where: { id: CommentId },
  });

  if (userOfComment === userId) {
    await Comment.destroy({ where: { id: CommentId } });

    return res.status(StatusCodes.OK).send("Comment deleted succesfully");
  }
  throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete the comment");
};

module.exports = { addComment, getAllComments, updateComment, deleteComment };