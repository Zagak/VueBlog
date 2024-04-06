const User = require('../models')

const register = async(req,res) =>{
  try{
    User.create(req.body);
  }catch(err){
    console.log(err)
    return res.status(500).send("There s a problem")
  }
  return res.status(200).send("User registered")
}

const login = (req,res) =>{
  return res.status(200).send("User logged in")
}
 
module.exports = {register,login}