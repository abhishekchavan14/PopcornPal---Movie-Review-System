exports.parseData = (req, res, next) => {
    const { trailer, cast, genres, tags } = req.body

    if (trailer) req.body.trailer = JSON.parse(trailer)
    if (cast) req.body.cast = JSON.parse(cast)
    if (genres) req.body.genres = JSON.parse(genres)
    if (tags) req.body.tags = JSON.parse(tags)

    next()
}