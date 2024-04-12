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

  //const sortedComments = sortCommentsIntoMap(mockComments);
  //console.log(sortedComments);
  //addChildCommentsToParent(mockComments, sortedComments);
  //console.log(sortedComments);
  //const topComments = setTopComments(sortedComments); //dunno about this , incearca doar cu sortedComments obtinut dupa addChildCommentsToParent sa constuiesti hierarhia

  ////
  // const topComments = [];
  // const childComments = [];

  // mockComments.forEach((cmt) => {
  //   if (cmt.CommentId === null) topComments.push(cmt);
  //   else childComments.push(cmt);
  // });

  async function getCommentHierarchy() {
    try {
      const sqlQuery = `
      WITH RECURSIVE CommentTree AS (
        SELECT 
          id, 
          "CommentId" AS parent_id, 
          text, 
          "UserId", 
          "postId", 
          "createdAt", 
          "updatedAt",
          1 AS LEVEL
        FROM "Comments"
        WHERE "CommentId" IS NULL
      
        UNION ALL
      
        SELECT 
          c.id, 
          c."CommentId",
          c.text, 
          c."UserId", 
          c."postId", 
          c."createdAt", 
          c."updatedAt",
          ct.LEVEL + 1
        FROM "Comments" c
        JOIN CommentTree ct ON ct.id = c."CommentId"
      )
      SELECT * FROM CommentTree;          
`;

      const result = await db.sequelize.query(sqlQuery, {
        //type: db.sequelize.QueryTypes.SELECT,
      });
      //console.log(result[0]);

      const nestComments = (comments, parentId = null) => {
        return comments
          .filter((comment) => comment.parent_id === parentId)
          .map((comment) => ({
            ...comment,
            children: nestComments(comments, comment.id),
          }));
      };

      const nestedComments = nestComments(result[0]);
      console.log(nestedComments[1]);
    } catch (error) {
      console.error("Error executing raw SQL:", error);
    }
  }

  getCommentHierarchy();
  res.status(StatusCodes.OK).json({});
  ////
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

  return res.status(StatusCodes.FORBIDDEN).send("Cannot modify the comment");
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

  return res.status(StatusCodes.FORBIDDEN).send("Cannot delete the comment");
};

module.exports = { addComment, getAllComments, updateComment, deleteComment };
