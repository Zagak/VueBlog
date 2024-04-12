const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.LOCAL_DB_URI, {
  dialect: "postgres",
  protocol: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: false, //change to true on production
  //     rejectUnauthorized: false,
  //   },
  // },
});

// async function restart() {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("All models were synchronized successfully.");
//   } catch (err) {
//     console.error("Error restarting table:", err);
//   }
// }
// restart();

// async function dropTable() {
//   try {
//     await sequelize.query('DROP TABLE IF EXISTS "users";');
//     await sequelize.query('DROP TABLE IF EXISTS "tokens";');
//     console.log("Table dropped successfully.");
//   } catch (error) {
//     console.error("Error dropping table:", error);
//   }
// }
// dropTable();

const db = {};

db.user = require("./User")(sequelize);
db.token = require("./Token")(sequelize);
db.comment = require("./Comment")(sequelize);
db.sequelize = sequelize;

db.user.hasMany(db.token);
db.token.belongsTo(db.user, { foreignKey: "UserId" });

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user, { foreignKey: "UserId" });

db.comment.hasMany(db.comment, { foreignKey: "CommentId" });

module.exports = db;
