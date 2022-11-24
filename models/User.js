const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  //Schema
  email:{
    type:String,
    required:[true, "Email is require"],
    unique:true,
    validate: [validator.isEmail, "valid Email is required"]
  },
  password:{
    type: String,
    required:[true,"Password is required"],
    minlength:[6, "password shoulld be at least 6 characters long"]

  }

})
// password encrypt middleware
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password, salt)
next()
})
const User = new mongoose.model('User', userSchema);

module.exports = User;