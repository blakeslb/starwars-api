console.log('hey');

const planetUrl = 'https://www.swapi.tech/api/planets'
const movieUrl = 'https://www.swapi.tech/api/films'

let loader = document.querySelector('.loader1');
let loader2 = document.querySelector('.loader2');
let loaderMessage = document.querySelector('loader-message');

//Retrieve movie data from API
const getMovieData = async () => {


    let response = await fetch(movieUrl)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json()



    //loop through each movie's data
    data.result.forEach(movie => {
        let moviesList = document.querySelector('#movies')

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
            <li>Director: ${movie.properties.director}</li>
            <li class="planets">Planets:</li>`


    })

}


const getPlanetData = function () {
    fetch(planetUrl)
        .then(response => {
            //Turn the response into something we can use
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            data.results.forEach(planet => {
                fetch(planet.url)
                    .then(response => {
                        return response.json()
                    }).then(data => {
                        console.log(data)

                        // const html = "";
                        let markup = " "
                        markup += `<div class='data-container'>
                    <h3>Name: ${data.result.properties.name}</h3>
                    <li>Population: ${data.result.properties.population}</li>
                    <li>Climate: ${data.result.properties.climate}</li>
                    <li>Terrain: ${data.result.properties.terrain}</li>
                    </div>`
                        //hide loader
                        loader.classList.add('hidden');
                        // loaderMessage.classList.add('hidden');

                        document.querySelector('ul').innerHTML += markup;

                    })
            })
        })

}

getPlanetData();
getMovieData();





