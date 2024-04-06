const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize(process.env.HEROKU_URI,{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })

module.exports = require("./User")(sequelize);