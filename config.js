const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://lulu:juilk634@ds119258.mlab.com:19258/cesimsi'

const MONGO_SCHEMA = new mongoose.Schema({
    name: String,
    firstname: String, 
    adress: String, 
    age: String,
    sex: String,
    password: String
})

module.exports = {
    MONGO_URI: MONGO_URI,
    MONGO_SCHEMA: MONGO_SCHEMA
}