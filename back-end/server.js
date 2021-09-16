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
  
let selectedGenre = 10749  //romance

const configList = {
  url: genreListLink,
  params: { 
      api_key: process.env.API_KEY,
      with_genres: selectedGenre,
      page: 8 
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
      console.log(data.genres)
      return res.status(200).send(data.genres)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Some error, sorry")
    }})




app.get('/movies', async(req,res) => {
  try{
    const { data } = await axios(configList)
    console.log(data.results)
    return res.status(200).send(data.results)}
  catch(error) {
    console.log(error)
    return res.status(500).send("Some sad error")
  }
})

app.get('/details', async(req,res) => {
  try{
    const { data } = await axios(configMovie)
    console.log(data)
    return res.status(200).send(data)}
  catch(error) {
    console.log(error)
    return res.status(500).send("Some very sad error")
  }
})




app.listen('3003')

