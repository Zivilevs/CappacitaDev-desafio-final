require('dotenv').config()
const  express = require('express')
const axios = require('axios')
const app = express()


const genreLink = "https://api.themoviedb.org/3/genre/movie/list"
  
const config = {
    method: 'get',
    url: genreLink,
    params: { 
        api_key: process.env.API_KEY,
        language: "en-US"
    }
  }

async function getGenres() {
  try {
  const response = await axios(config)
  const genres = response.data.genres
  console.log(genres)
  console.log(typeof(genres))

  } catch (error) {
    console.error(error)
  }
}
const genres = getGenres()
console.log(genres)
