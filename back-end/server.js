require('dotenv').config()
const  express = require('express')
const axios = require('axios')
const app = express()
const dataBase = require('./database/databaseKnex')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json()) 


const genreLink = "https://api.themoviedb.org/3/genre/movie/list"
const genreListLink = "https://api.themoviedb.org/3/discover/movie"
const movieLink = "https://api.themoviedb.org/3/movie/"


// GET available genres from TMDB API
app.get('/genres', async(req, res) => {
  const configGenre = {
    url: genreLink,
    params: { 
        api_key: process.env.API_KEY,
        language: "en-US"
    }
  }

    try {
      const { data } = await axios(configGenre)
      return res.status(200).send(data.genres)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Some error, sorry")
    }})

// POST selected genre to MySQL 
app.post('/genre', async (req, res) => {
  try {
    const genre = await dataBase.salvarGenre({
      nome: req.body.nome,
      genre_id: req.body.genre_id,
    })
    console.log("apos POST", genre)
    res.status(201).send(genre)

  } catch (error) {
    return res.status(500).send("Some error, sorry")
  }
})


// GET previous or next pages for list of movies by selected genre from TMBD API
let previous_page_genre_id = ""
let page = 0

app.get('/movies/:id/:moveforward', async(req,res) => {

  const genre_id = req.params.id
  const moveForward = req.params.moveforward
  if (moveForward == "true") {
    if(previous_page_genre_id != genre_id) {
      page = 1
    } else {
      page++
    }
  } else {
    if(page > 1) {
      page --
    } else {
      page = 1
    }
  }
  previous_page_genre_id = genre_id

  const configList = {
      url: genreListLink,
      params: { 
          api_key: process.env.API_KEY,
          with_genres: genre_id,
          page: page
      }
  }
  try{
    const { data } = await axios(configList)
    return res.status(200).send(JSON.stringify(data.results))}
  catch(error) {
    console.log(error)
    return res.status(500).send("Some sad error")
  }
})


// GET  movie details from  TMBD API
app.get('/details/:movie_id', async(req,res) => {

  const movieId = req.params.movie_id

  const configMovie = {
    url: movieLink + movieId,
    params: { 
        api_key: process.env.API_KEY,
        language: "en-US"
    }
  }

  try{
    const { data } = await axios(configMovie)
    return res.status(200).send(data)}
  catch(error) {
    console.log(error)
    return res.status(500).send("Some very sad error")
  }
})


// GET selected genres by count from MySQL
app.get('/popularity', async(req,res) => {
  try {
    const topGenres = await dataBase.selectTopGenres()
    console.log(topGenres)
    res.status(200).send(topGenres)
  } catch (error) {
    console.log(error)
    return res.status(500).send("ahhh some error...")
  }
})


app.listen('3003')

