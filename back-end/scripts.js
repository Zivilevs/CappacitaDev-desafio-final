const toggleExpansion = (element, to, duration = 350) => {
    return new Promise((res) => {
      element.animate([
        {
      top: to.top,
      left: to.left,
      width: to.width,
      height: to.height
        }
      ], {duration, fill: 'forwards', ease: 'ease-in'})
      element.classList.toggle('card-content')
      setTimeout(res, duration);
    })
  }

  const fadeContent = (element, opacity, duration = 300) => {
      return new Promise(res => {
          [...element.children].forEach((child) => {
              requestAnimationFrame(() => {
                  child.style.transition = `opacity ${duration}ms linear`;
                  child.style.opacity = opacity;
              });
          })
          setTimeout(res, duration);
      })
  }

let moveForward = true
let genre_id = '28'  // default

function listarMovies(genre_id, moveForward=true) {

    let movieslist = document.getElementsByClassName('cards')
    movieslist = movieslist[0]
    movieslist.innerHTML = ""

    let xhttp = new XMLHttpRequest()
    let url = `http://localhost:3003/movies/${genre_id}/${moveForward}`
    xhttp.open('get', url, false)
    xhttp.send()

    let response = JSON.parse(xhttp.responseText)
    for(let i = 0; i < response.length; i++) {
        
        let movie = response[i]
        let movieTitle = movie.title
        let title_movie = document.createElement('h2')
        title_movie.innerHTML = `${movieTitle}`
        title_movie.className = "info title"

        let img = document.createElement('img')
        let base_url = "http://image.tmdb.org/t/p/w500/"
        img.src = `${base_url}${movie.poster_path}`
        let starIcon = document.createElement('i')
        starIcon.className = "bi star star-fill"
        starIcon.onclick = function() {
            // ADITIONAR NO BANCO COMO whatch list
            // mudar para star-fill red
            pass
        }

        let div = document.createElement('div')
        div.className = 'card'
        div.appendChild(img)
        div.appendChild(title_movie)
        div.appendChild(starIcon)
    
        movieslist.appendChild(div)

        div.onclick = async (e) => {
            const card = e.currentTarget
            // clone the card
            const movieClone = card.cloneNode(true)
            showdetails(movie.id, card, movieClone)
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
        console.log("depois listarMovie", genre_id)
    }
}

const nextPage = function() {
    listarMovies(genre_id)
    }

const previousPage = function() {
    moveForward = false
    listarMovies(genre_id, moveForward)
    }

const showdetails = async function(movieId, card, movieClone) {
    
    let url = `http://localhost:3003/details/${movieId}`
    let movieDetails = await fetch(url, {method: 'GET', mode: 'cors', cache: "default"})
                                .then(movie => movie.json())
    
    let release_date = movieDetails.release_date
    release = document.createElement('p')
    release.innerHTML = `Release date: ${release_date}`
    
    let overview = document.createElement('p')
    overview.innerHTML = `${movieDetails.overview}`

    let rating = document.createElement('p')
    rating.innerHTML = `Average vote: ${movieDetails.vote_average}`

    movieClone.appendChild(release)
    movieClone.appendChild(overview)
    movieClone.appendChild(rating)

    const {top,left,width,height} = card.getBoundingClientRect()
    // position  the clone on the top of original
    movieClone.style.position = 'fixed'
    movieClone.style.top = top + 'px'
    movieClone.style.left = left + 'px'
    movieClone.style.width = width + 'px'
    // hide the original movie card opacity
    card.style.opacity = 0.2
    // add to the same container
    card.parentNode.appendChild(movieClone)
    // create a close button to handle the undo
	const closeButton = document.createElement('button')
    closeButton.innerHTML = "X"
    console.log(movieClone)
	   
    await toggleExpansion(movieClone, {top: 0, left: 0, width: '60vw', height: '90vh'});
        // set the display block so the content will follow the normal flow in case the original card is not display block
    movieClone.appendChild(closeButton)

    movieClone.style.display = 'flex';
    movieClone.style.padding = '0';

	closeButton.addEventListener('click', async () => {
	    closeButton.remove()
        // remove the display style so the original content is displayed right
	    movieClone.style.removeProperty('display');
	    movieClone.style.removeProperty('padding');
	    // show original card content
	    [...movieClone.children].forEach(child => child.style.removeProperty('display'));
	    fadeContent(movieClone, '0')
	    // shrink the card back to the original position and size
	    await toggleExpansion(movieClone, {top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`}, 300)
	    // show the original card again
	    card.style.removeProperty('opacity');
	    movieClone.remove()
		})

      

    //cia mano..
    movieClone.click(function() {
        pass
    })
   
}


chooseGenre()

listarMovies(genre_id)

