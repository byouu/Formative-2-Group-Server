const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// this will be our data base's data structure 
const WorkSchema = new Schema(
  {
    id: Number,
    name: String,
    imageUrl: String,
    author: String,
    url: String
  },
  { timestamps: true }
)
 
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Work', WorkSchema)