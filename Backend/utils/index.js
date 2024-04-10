// put the comments array in a map with key:CommentId and value:the comment
const sortCommentsIntoMap = (commentsArray) => {
  const commentsMap = new Map();

  if (commentsArray && commentsArray.length > 0) {
    for (const item of commentsArray) {
      if (item) {
        commentsMap.set(item.CommentId, item);
      }
    }
  }

  return commentsMap;
};

const addChildCommentsToParent = (commentsArray, commentsMap) => {};

module.exports = { sortCommentsIntoMap };
