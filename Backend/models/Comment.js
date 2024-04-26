const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    postId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    CommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Comments",
        key: "id",
      },
    },
  });

  return Comment;
};
