const { Sequelize } = require('sequelize');

const connectDB = (uri) =>{
  return new Sequelize(uri,{
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
}

module.exports=connectDB