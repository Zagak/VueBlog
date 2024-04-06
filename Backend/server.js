require('dotenv').config()

const express = require("express")
const server = express()

const connectDB = require('./db/connect')
const authRouter = require('./routes/auth')

server.use(express.json())

server.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 5000

//let sequelize = null;
const start = async() =>{
  try{
    // sequelize = await connectDB(process.env.HEROKU_URI)
    // await sequelize.authenticate();
    
    server.listen(port,()=>{
      console.log(`Server is listening to port ${port} ...`)
    })
  }catch (error){
    console.log(error)
  }
}

start()

// const getSequelize = sequelize

// module.exports={getSequelize}