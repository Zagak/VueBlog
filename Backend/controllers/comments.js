const CustomError = require("../errors/custom-error");
const db = require("../models");
const Comment = db.comment;
const { StatusCodes } = require("http-status-codes");

const addComment = async (req, res) => {
  const { text, postId, CommentId } = req.body;

  const UserId = req.user.userId;
  const UserName = req.user.name;

  if (text === "" || !text)
    throw new CustomError(StatusCodes.NO_CONTENT, "Comment cannot be empty");

  let newComment = null;
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
    newComment = await Comment.create({
      text,
      postId: postId,
      UserId,
      CommentId: parentComment.id,
    });
  } else {
    newComment = await Comment.create({
      text,
      postId: postId,
      UserId,
      CommentId: null,
    });
  }

  return res
    .status(StatusCodes.OK)
    .json({ ...newComment.dataValues, name: UserName });
};

const getAllComments = async (req, res) => {
  const { postId } = req.query;
  const userId = req.user?.userId;

  const maximumLevel = 3;

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
          c."deleted",
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
          c."deleted",
          ct.LEVEL + 1
          FROM "Comments" c
          JOIN CommentTree ct ON ct.id = c."CommentId"
          JOIN "Users" u ON c."UserId" = u."id"
          WHERE c."postId" = ${postId}
      )
      SELECT * FROM CommentTree ORDER BY "createdAt" DESC;           
`;

      const result = await db.sequelize.query(sqlQuery);

      //TODO: Implemet caching with redis and more/less comment feature
      const nestComments = (comments, currentDepth = 0, parentId = null) => {
        //if (currentDepth === maximumLevel) return null;
        return comments
          .filter((comment) => comment.parent_id === parentId)
          .map((comment) => ({
            ...comment,
            editable: userId ? comment.UserId == userId : false,
            deleted: comment.deleted == "true" ? true : false,
            level: comment.level,
            children: nestComments(comments, comment.level, comment.id),
          }));
      };
      //
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

  let updatedComment = null;

  if (userOfComment === userId) {
    updatedComment = await Comment.update(
      { text: newText },
      { where: { id: CommentId } }
    );

    return res.status(StatusCodes.OK).json(newText);
  }

  throw new CustomError(StatusCodes.FORBIDDEN, "Cannot modify the comment");
};

const deleteComment = async (req, res) => {
  console.log("s a apelat delete");
  const { userId } = req.user;

  const { id: CommentId } = req.params;

  const { UserId: userOfComment, CommentId: parentComment } =
    await Comment.findOne({
      where: { id: CommentId },
    });

  console.log(userOfComment);
  console.log(userId);
  if (userOfComment === userId) {
    //await Comment.destroy({ where: { id: CommentId } });//I need to decide when to delete for good and when to mark it

    const commentChild = await Comment.findOne({
      where: { CommentId: CommentId },
    });
    if (!commentChild) {
      await Comment.destroy({ where: { id: CommentId } });

      let parent;
      // if (parentComment == null)
      //   await Comment.destroy({ where: { id: parentComment } });
      // else {
      parent = await Comment.findOne({
        where: { id: parentComment },
      });

      if (parent.deleted == "true")
        await Comment.destroy({ where: { id: parent.id } });
      //}
    } else
      await Comment.update(
        { deleted: true, text: "" },
        { where: { id: CommentId } }
      );

    return res.status(StatusCodes.OK).send("Comment deleted succesfully");
  }
  throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete the comment");
};

module.exports = { addComment, getAllComments, updateComment, deleteComment };
