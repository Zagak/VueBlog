const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.prototype.createRefreshJWT = function () {
    return jwt.sign(
      { userId: this.id, name: this.name, email: this.email },
      process.env.JWT_RFS_SECRET,
      {
        expiresIn: process.env.JWT_RFS_LIFETIME,
      }
    );
  };

  User.prototype.createAccesJWT = function () {
    return jwt.sign(
      { userId: this.id, name: this.name, email: this.email },
      process.env.JWT_ACC_SECRET,
      {
        expiresIn: process.env.JWT_ACC_LIFETIME,
      }
    );
  };

  User.prototype.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  };

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  });

  (async () => {
    await sequelize.sync();
    // Code here
  })();

  return User;
};
