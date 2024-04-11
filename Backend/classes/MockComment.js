class MockComment {
  constructor(
    id,
    text,
    postId,
    createdAt,
    updatedAt,
    UserId,
    CommentId,
    childCommets
  ) {
    this.id = id;
    this.text = text;
    this.postId = postId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.UserId = UserId;
    this.CommentId = CommentId;
    this.childCommets = childCommets; //the new property to User model
  }
}

module.exports = MockComment;
