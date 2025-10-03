const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
    title:String,
    name:String
})
const moviemodel = mongoose.model('movie',movieSchema)
module.exports = moviemodel