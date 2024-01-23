const mongoose = require('mongoose')

//mongoose.connect('mongodb://URI/db_name) URI-uniform resource identifier
mongoose.connect('mongodb://localhost:27017/review_app')
    .then(() => {
        console.log("DB is connected...")
    }).catch((err) => {
        console.log("DB connection failed!: ", err)
    })
