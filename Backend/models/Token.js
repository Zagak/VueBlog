const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Token = sequelize.define("Token", {
    refreshToken: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
  });

  (async () => {
    await sequelize.sync();
    // Code here
  })();

  return Token;
};
