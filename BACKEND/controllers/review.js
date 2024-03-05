const { isValidObjectId } = require("mongoose")
const Movie = require("../models/movie")
const Review = require("../models/review")

exports.addReview = async (req, res) => {
    const { movieId } = req.params
    const { content, rating } = req.body
    const userId = req.user._id

    //checking is movie id is valid
    if (!isValidObjectId(movieId)) return res.json({ error: "Invalid Movie!" })

    //checking if the movie exists in DB
    const movie = await Movie.findOne({ _id: movieId })
    if (!movie) return res.status(404).json({ error: "Movie not found!" })

    //checking if the user has already reviewed this movie
    const isAlreadyReviewed = await Review.findOne({ owner: userId, parentMovie: movie._id })
    if (isAlreadyReviewed) return res.json({ error: "Already Reviewed this movie!" })

    //is all good then create and update review
    const newReview = new Review({
        owner: userId,
        parentMovie: movie._id,
        content,
        rating,
        // votes
    })

    //creating and updating the review
    movie.reviews.push(newReview._id) //as the reviews field is array in movie model
    await movie.save() //updating review in the Movie DB

    await newReview.save() //saving the review in Review DB

    //sending response to frontend
    res.json({ message: "Your Review has been added!" })
}


exports.updateReview = async (req, res) => {
    const { reviewId } = req.params
    const { content, rating } = req.body
    const userId = req.user._id

    //checking is movie id is valid
    if (!isValidObjectId(reviewId)) return res.json({ error: "Invalid Review ID!" })

    //checking if the review is of that owner only, if it is then only let him update it
    const review = await Review.findOne({ owner: userId, _id: reviewId })

    if (!review) return res.status(404).json({ error: "Review not found!" })

    review.content = content
    review.rating = rating

    await review.save()

    res.json({ message: "Review has been updated!" })
}

exports.removeReview = async (req, res) => {

    const { reviewId } = req.params
    const userId = req.user._id

    if (!isValidObjectId(reviewId)) return res.json({ error: "Invalid Review ID" })

    const review = await Review.findOne({ owner: userId, _id: reviewId })
    if (!review) return res.status(404).json({ error: "Invalid request, Review not found!" })

    //delete the review and update the movie db
    const movie = await Movie.findById(review.parentMovie).select('reviews')
    movie.reviews = movie.reviews.filter(rId => rId.toString() !== reviewId) //when we want to compare two object IDs we need to make both of them in string

    await Review.findByIdAndDelete(reviewId)
    await movie.save()


    res.json({ message: "Review has been removed!" })
}


exports.getReviewsByMovie = async (req, res) => {

    const { movieId } = req.params

    if (!isValidObjectId(movieId)) return res.json({ error: "Invalid Movie ID" })

    //movie.findById will give only ID, to get all the data about the review we need to populate it. Also while populating reviews we need to populate owner inside the review.
    const movie = await Movie.findById(movieId).populate({
        path: "reviews",
        populate: {
            path: "owner",
            select: "username",
        }
    }).select('reviews')

    const reviews = movie.reviews.map((r)=>{
        const {owner, content, rating, _id:reviewId} = r
        const {username, _id:ownerId} = owner

        return{
            id:reviewId,
            owner:{
                id:ownerId,
                username,
            },
            content,
            rating,
        }
    })


    res.json({reviews})
}