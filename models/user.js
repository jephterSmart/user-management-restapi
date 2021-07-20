const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    newData:{
        type: Object
    },
    imageUrl:{
        type: String,
        default:'/images/default.jpg'
    }
      
})

module.exports = mongoose.model('User',userSchema);