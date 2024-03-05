const { isValidObjectId } = require("mongoose")
const cloudinary = require("../cloud/index")
const Movie = require("../models/movie")

exports.uploadTrailer = async (req, res) => {
  const { file } = req
  if (!file) return res.status(404).json({ error: "Video File Missing!" })

  const videoRes = await cloudinary.uploader.upload(file.path, { resource_type: "video" })
  const { secure_url, public_id } = videoRes

  res.status(201).json({ public_id, secure_url })
}
exports.createMovie = async (req, res) => {
  const { file, body } = req
  const {
    title,
    storyline,
    director,
    releaseDate,
    type,
    genres,
    tags,
    cast,
    trailer,
    language
  } = body

  const newMovie = new Movie({
    title,
    storyline,
    director,
    releaseDate,
    type,
    genres,
    tags,
    cast,
    trailer,
    language
  })


  //upload poster
  const posterRes = await cloudinary.uploader.upload(file.path, {
    transformation: {
      width: 1280,
      height: 720
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3
    }
  })
  const { secure_url, public_id, responsive_breakpoints } = posterRes
  const newPoster = { secure_url, public_id, responsive: [] }
  const { breakpoints } = responsive_breakpoints[0]
  if (breakpoints.length) {
    for (let imgObj of breakpoints) {
      const { secure_url } = imgObj
      newPoster.responsive.push(secure_url)
    }
  }
  newMovie.poster = newPoster

  await newMovie.save()
  res.status(201).json({
    id: newMovie._id,
    title: newMovie.title,
  })
}

exports.updateMovie = async (req, res) => {
  const { movieID } = req.params
  if (!isValidObjectId(movieID)) return res.status(400).json({ error: "Invalid Movie ID!" })

  if (!req.file) return res.status(404).json({ error: "Poster is Missing!" })
  const movie = await Movie.findById(movieID)
  if (!movie) return res.status(404).json({ error: "Movie not found!" })

  const {
    title,
    storyline,
    director,
    releaseDate,
    type,
    genres,
    poster,
    tags,
    cast,
    trailer,
    language
  } = req.body

  movie.title = title;
  movie.storyline = storyline;
  movie.director = director;
  movie.releaseDate = releaseDate;
  movie.type = type;
  movie.genres = genres;
  movie.tags = tags;
  movie.cast = cast;
  movie.trailer = trailer;
  movie.language = language;


  //update poster
  const posterID = movie.poster?.public_id
  if (posterID) {
    const { result } = await cloudinary.uploader.destroy(posterID)
    if (result !== "ok") return res.status(400).json({ error: "Cannot update Poster!" })
  }

  const posterRes = await cloudinary.uploader.upload(req.file.path, {
    transformation: {
      width: 1280,
      height: 720
    },
    responsive_breakpoints: {
      create_derived: true,
      max_width: 640,
      max_images: 3
    }
  })
  const { secure_url, public_id, responsive_breakpoints } = posterRes
  const newPoster = { secure_url, public_id, responsive: [] }
  const { breakpoints } = responsive_breakpoints[0]
  if (breakpoints.length) {
    for (let imgObj of breakpoints) {
      const { secure_url } = imgObj
      newPoster.responsive.push(secure_url)
    }
  }
  movie.poster = newPoster

  await movie.save()

  res.json({ message: "Movie Updated Successfully", movie })
}

exports.removeMovie = async (req, res) => {
  const { movieID } = req.params
  if (!isValidObjectId(movieID)) return res.status(400).json({ error: "Invalid Movie ID!" })

  const movie = await Movie.findById(movieID)
  if (!movie) return res.status(404).json({ error: "Movie not found!" })

  const posterID = movie.poster?.public_id
  if (posterID) {
    const { result } = await cloudinary.uploader.destroy(posterID)
    if (result !== "ok") return res.status(400).json({ error: "Could not remove poster from cloud!" })
  }

  const trailerID = movie.trailer?.public_id
  if (!trailerID) return res.status(400).json({ error: "Trailer not found on cloud" })

  const { result } = await cloudinary.uploader.destroy(trailerID, { resource_type: 'video' })
  if (result !== "ok") return res.json({ error: "Cannot remove trailer from cloud" })


  await Movie.findByIdAndDelete(movieID)
  res.json({ message: "Movie Removed Successfully!" })
}

//Search Movie

exports.getLatestUploads = async (req, res) => {


  const results = await Movie.find().sort('-createdAt').limit(5)
  const movies = results.map((m) => {
    return {
      id: m._id,
      title: m.title,
      poster: m.poster?.secure_url,
      trailer: m.trailer?.url
    }
  })

  res.json({ movies })
}

exports.getSingleMovie = async (req, res) => {
  const { movieId } = req.params
  if (!isValidObjectId(movieId)) return res.json({ error: "Invalid Movie ID" })

  const movie = await Movie.findById(movieId)


  const {
    _id: id,
    title,
    storyline,
    director,
    releaseDate,
    type,
    genres,
    poster,
    tags,
    cast,
    trailer,
    language
  } = movie


  res.json({
    movie: {
      id,
      title,
      storyline,
      director,
      releaseDate,
      type,
      genres,
      tags,
      language,
      cast: cast.map((c) => ({
        name: c.artistName,
        roleAs: c.roleAs,
        leadActor: c.leadActor,
      })),
      poster: poster?.secure_url,
      trailer: trailer?.url,
    },
  })

}