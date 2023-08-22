const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String,require},
    password:{type:String,require},
    confirmpassword : {type:String, required:true}

})

const UserModel = mongoose.model("user",UserSchema)

module.exports = {UserModel}