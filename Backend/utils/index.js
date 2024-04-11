// put the comments array in a map with key:CommentId and value:the comment
const sortCommentsIntoMap = (commentsArray) => {
  const commentsMap = new Map();

  if (commentsArray && commentsArray.length > 0) {
    for (const cmt of commentsArray) {
      if (cmt) {
        if (!commentsMap.has(cmt.CommentId)) {
          commentsMap.set(cmt.CommentId, cmt);
        }
      }
    }
  }

  return commentsMap;
};

const addChildCommentsToParent = (commentsArray, commentsMap) => {
  if (commentsArray && commentsArray.length > 0 && commentsMap) {
    for (const cmt of commentsArray) {
      if (commentsMap.has(cmt.CommentId)) {
        parentComment = commentsMap.get(cmt.CommentId);
        if (parentComment) {
          parentComment.childCommets.push(cmt);
        }
      }
    }
  }
};

const setTopComments = (commentsMap) => {
  let topArray = [];

  if (commentsMap) {
    commentsMap.forEach((value, key) => {
      if (!key) {
        topArray = value.childCommets;
      }
    });
  }

  return topArray;
};

module.exports = {
  sortCommentsIntoMap,
  addChildCommentsToParent,
  setTopComments,
};
