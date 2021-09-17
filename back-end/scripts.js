
let moveForward = true
let genre_id = '28'  // default

function listarMovies(genre_id, moveForward=true) {
    let xhttp = new XMLHttpRequest()
    let movieslist = document.getElementById('movieList')
    movieslist.innerHTML = ""
    console.log("movieslist", moveForward)
    let url = `http://localhost:3003/movies/${genre_id}/${moveForward}`

    xhttp.open('get', url, false)
    xhttp.send()
    let response = JSON.parse(xhttp.responseText)

    for(let i = 0; i < response.length; i++) {
        let movie = response[i]
               
        let movieTitle = movie.original_title
        let title_movie = document.createElement('p')
        title_movie.innerHTML = `${movieTitle}`

        let img = document.createElement('img')
        let base_url = "http://image.tmdb.org/t/p/w500/"
        img.src = `${base_url}${movie.poster_path}`
        console.log(movie.poster_path)
        img.className = 'img-fluid img-thumbnail'
        let starIcon = document.createElement('i')
        starIcon.className = "bi star star-fill"
        starIcon.onclick = function() {
            // ADITIONAR NO BANCO COMO whatch list
            // mudar para star-fill red
            pass
        }

        let release_date = movie.release_date
        let release = document.createElement('p')
        release.innerHTML = `Release date: ${release_date}`

        let div = document.createElement('div')
        let nodeId = movie.id
        div.className = 'col card bg-light'
        div.id = nodeId
        div.appendChild(img)
        div.appendChild(title_movie)
        div.appendChild(release)
        div.appendChild(starIcon)
        movieslist.appendChild(div)
        div.onclick = function() {
            let movieId = div.id
            console.log(movieId)
            showdetails(movieId)
        }
    }
}

const chooseGenre = function() {
    let xhttp = new XMLHttpRequest()
    let genre_list = document.getElementById('genres')
    let url = "http://localhost:3003/genres"

    xhttp.open('get', url, false)
    xhttp.send()
    let response = JSON.parse(xhttp.responseText)

    for(let i = 0; i < response.length; i++){
        let genre = response[i]
        let genreId = genre.id
        let genre_name = genre.name
        let option = document.createElement('option')
        option.innerHTML = genre_name.charAt(0).toUpperCase() + genre_name.slice(1)
        option.setAttribute('value', genreId)
        genre_list.appendChild(option)
    }
    genre_list.onclick = function(){ 
        genre_id = genre_list.value
        console.log("Zanras: ", genre_id)
        listarMovies(genre_id)
    }
}

const nextPage = function() {
    listarMovies(genre_id)
    }

const previousPage = function() {
    moveForward = false
    listarMovies(genre_id, moveForward)
    }

const showdetails = async function(movieId) {
    let Main = document.getElementsByTagName('main')
    let divM = document.createElement('div')
    let url = `http://localhost:3003/details/${movieId}`
    let movie = await fetch(url, {method: 'GET', mode: 'cors', cache: "default"})
                                .then(movie => movie.json())
    
    let original_title = movie.original_title
    let movie_title = document.createElement('p')
    movie_title.innerHTML = `${original_title}`

    let img = document.createElement('img')
    let base_url = "http://image.tmdb.org/t/p/w500/"
    img.src = `${base_url}${movie.poster_path}`
    img.className = 'img-fluid img-thunmbnail rounded'
    let starIcon = document.createElement('i')
    starIcon.className = "bi star star-fill"
    starIcon.onclick = function() {
            // ADITIONAR NO BANCO COMO whatch list
            // mudar para star-fill red
    pass
    }

    let release_date = movie.release_date
    let release = document.createElement('p')
    release.innerHTML = `Release date: ${release_date}`

    
    let nodeId = movie.id
    divM.className = 'col card bg-light'
    divM.id = nodeId
    divM.appendChild(img)
    divM.appendChild(movie_title)
    divM.appendChild(release)
    divM.appendChild(starIcon)
    console.log(Main)
    Main[0].appendChild(divM)

}


chooseGenre()
listarMovies(genre_id)
