const { Schema, model } = require("mongoose")

const urlSchema = new Schema({
    longUrl: String,
    shortUrl: String
  })
  
const urlModel = model("urlModel", urlSchema)

module.exports = { urlModel }