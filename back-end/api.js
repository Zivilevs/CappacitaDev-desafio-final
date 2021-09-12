require('dotenv').config()
const axios = require('axios')

const genreLink = "https://api.themoviedb.org/3/genre/movie/list"
  
const config = {
    method: 'get',
    url: genreLink,
    params: { 
        api_key: process.env.API_KEY,
        language: "en-US"
    }
  }
let responseGenres;

const api = axios(config)
  .then(function (response){})
  .catch(function (error){})


console.log(api.response.data)
  