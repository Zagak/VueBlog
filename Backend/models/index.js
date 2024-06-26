"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    process.env.DB_PASSWORD, //config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.user = require("./User")(sequelize);
db.token = require("./Token")(sequelize);
db.comment = require("./Comment")(sequelize);

(async () => {
  try {
    // Synchronize all models at once
    await sequelize.sync();

    // Tables associations
    db.user.hasMany(db.token);
    db.token.belongsTo(db.user, { foreignKey: "UserId" });

    db.user.hasMany(db.comment);
    db.comment.belongsTo(db.user, { foreignKey: "UserId" });

    db.comment.hasMany(db.comment, { foreignKey: "CommentId" });

    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error during table creation", error);
  }
})();

module.exports = db;
