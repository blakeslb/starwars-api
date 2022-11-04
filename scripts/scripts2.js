console.log('hey');

const planetUrl = 'https://www.swapi.tech/api/planets'
const movieUrl = 'https://www.swapi.tech/api/films'

let loader = document.querySelector('.loader1');
let loader2 = document.querySelector('.loader2');
let loaderMessage = document.querySelector('loader-message');



const getAllMovieData = async () => {


    let response = await fetch(movieUrl)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json()



    //loop through each movie's data
    data.result.forEach(movie => {
        let moviesList = document.querySelector('#movies-full')

        //initialize markup variable
        let markup = " "
        //store planet strings in an array
        let planetsArr = movie.properties.planets
        //loop through each planet string
        planetsArr.forEach(planet => {
            fetchPlanetName = async () => {
                //fetch data at the API endpoint stored in the array
                let response = await fetch(planet)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                // Add a piece of that data - planet name - to the markup variable
                markup += `<li class="planet-name">${data.result.properties.name}</li>`
                moviesList.innerHTML += markup;

            }
            fetchPlanetName();
            markup += `</div>`

        })
        // console.log(planets)
        //hide loader
        loader2.classList.add('hidden');
        // loaderMessage.classList.add('hidden');

        markup += `<div class='data-container purple'>
            <h3>Title: ${movie.properties.title}</h3>
            <li>Summary: ${movie.properties.opening_crawl}</li>
            <br>
            <li>Director: ${movie.properties.director}</li>
            <li>Producer: ${movie.properties.producer}</li>
            <li>Release date: ${movie.properties.release_date}</li>
            <li class="planets">Planets:</li>`


    })

}




getAllMovieData()
