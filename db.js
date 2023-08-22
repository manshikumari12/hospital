const mongoose = require("mongoose");
require("dotenv").config()
const connection = mongoose.connect("mongodb+srv://manshisbp:manshi@cluster0.uwpiapl.mongodb.net/hospital?retryWrites=true&w=majority");
// /hhhiljdfilsd
module.exports = {connection}