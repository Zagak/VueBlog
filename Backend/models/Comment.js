const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  });

  (async () => {
    await sequelize.sync();
    // Code here
  })();

  return Comment;
};
