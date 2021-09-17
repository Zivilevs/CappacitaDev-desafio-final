require('dotenv').config()
const  express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

app.use(cors())

const genreLink = "https://api.themoviedb.org/3/genre/movie/list"
const genreListLink = "https://api.themoviedb.org/3/discover/movie"
const movieLink = "https://api.themoviedb.org/3/movie/"

const configGenre = {
    url: genreLink,
    params: { 
        api_key: process.env.API_KEY,
        language: "en-US"
    }
  }

let movieId = 552687

const configMovie = {
  url: movieLink + movieId,
  params: { 
      api_key: process.env.API_KEY,
      language: "en-US"
  }
}

app.get('/genres', async(req, res) => {
    try {
      const { data } = await axios(configGenre)
      //console.log(data.genres)
      return res.status(200).send(data.genres)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Some error, sorry")
    }})



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


console.log("mano endpoint movies: ", genre_id, page)

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

app.get('/details', async(req,res) => {
  try{
    const { data } = await axios(configMovie)
    return res.status(200).send(data)}
  catch(error) {
    console.log(error)
    return res.status(500).send("Some very sad error")
  }
})

app.listen('3003')

