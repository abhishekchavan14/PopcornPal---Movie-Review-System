const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentMovie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        trim: true,
    }
    // votes:{
    //     type: Number
    // }
})

module.exports = mongoose.model("Review", reviewSchema)