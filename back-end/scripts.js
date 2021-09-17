function listarMovies(id, pageNum) {
    let xhttp = new XMLHttpRequest()
    let movieslist = document.getElementById('movieList')
    movieslist.innerHTML = ""
    let url = `http://localhost:3003/movies/${id}/${pageNum}`

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
    console.log()
    genre_list.onclick = function(){ 
        genre_id = genre_list.value
        console.log("Zanras: ", genre_id)
        listarMovies(genre_id)
    }
}
chooseGenre()

const nextPage = function() {
    let xhttp = new XMLHttpRequest()
    let page = document.getElementById('pagination')
    pageNum = toString(page.value + 1)
    page.setAttribute('value', pageNum)
    console.log(page.value)
    listarMovies(genre_id, page.value)
}

