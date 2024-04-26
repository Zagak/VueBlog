const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Token = sequelize.define("Token", {
    refreshToken: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  return Token;
};
