const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.HEROKU_URI, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// async function dropTable() {
//   try {
//     await sequelize.query('DROP TABLE IF EXISTS "users";');
//     console.log("Table dropped successfully.");
//   } catch (error) {
//     console.error("Error dropping table:", error);
//   }
// }
// dropTable();

const db = {};

db.user = require("./User")(sequelize);
db.token = require("./Token")(sequelize);

db.user.hasMany(db.token, { as: "tokens" });
db.token.belongsTo(db.user, {
  foreignKey: "UserId",
  as: "User",
});

module.exports = db;
