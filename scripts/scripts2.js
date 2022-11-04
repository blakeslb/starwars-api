



// const getMovieData = function() {
//     fetch(movieUrl)
//         .then(response => {
//             return response.json()
//         })
//         .then(data => {
//             console.log(data)
//             data.result.forEach(movie => {
//                 console.log(movie.properties.title)

//                 let markup = " "
//                 markup += `<div class='data-container'>
//             <h3>Title: ${movie.properties.title}</h3>
//             <li>Desc: ${movie.properties.opening_crawl}</li>
//             <li>Director: ${movie.properties.director}</li>
//             <li class="planets">Planets:</li>
//             </div>`

//             let planetsArr = movie.properties.planets
//             planetsArr.forEach(planet => {
//                     fetch(planet)
//                     .then(response =>{
//                         return response.json()
//                     }).then(data =>{
//                         return data;
//                         // moviesList.appendChild(markup);
//                         // markup.innerHTML += `<li>${data.result.properties.name}</li>`
//                         // let planetNames = " "
//                         // planetNames += `<li>Planets: </li>`

//                     })
//                 })

//                 console.log(markup)

    
//                 const moviesList = document.querySelector('#movies');
//                 moviesList.innerHTML += markup;
//                 console.log(document.querySelector('#movies'));

//             })
//         })
// }console.log('hey');

const planetUrl = 'https://swapi.dev/api/planets/'
const movieUrl = 'https://swapi.dev/api/films'

const getMovieData = function () {
    fetch(movieUrl)
        .then(response => {
            return response.json()
        })
        .then(data => {
            data.results.forEach(film => {
                const markup =
                `<div class="data-container purple">
                <h3>${film.title}</h3>
                <li>Release date: ${film.release_date}</li>
                
                </div>`
                document.querySelector('#movies').insertAdjacentHTML('beforeend', markup);
                // need to add planets 
            })
        })
}
const getPlanetData = function () {
    // return
    fetch(planetUrl)
        .then(response => {
            //Turn the response into something we can use
            return response.json()
        })
        .then(data => {
            //loop through data, pick out what we want to display
            data.results.forEach(planet => {
                const markup =
                    `<div class="data-container"><h3>${planet.name}</h3>
             <li>Population: ${planet.population}</li>
             <li>Climate: ${planet.climate}</li>
             <li>Terrain: ${planet.terrain}</li>
             <p>Appears in</p>
             </div>`

                //  you need to loop through this dumb array of films
                planet.films.forEach(film => {
                    fetch(film)
                        .then(response => {
                            return response.json()
                        })
                        .then(data => {
                            `<li>${data.title}</li>`
                            return data;
                        });

                })






                //  `<li>Appears in: ${planet.films}</li>`
                //must turn URL into link. we could try this
                //grab Url
                //insert URL into new fetch request
                //pull out and store the name of the film
                //add event listener function to that name
                //when even listener is clicked, API call to the URL associated with that name
                //repeat this procress, add data under new div tag
                //append under 'ul' tag

                document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
            });
            //    console.log(data);
        })
        .catch(error => console.log(error));
}

//Event listener
//apply on all planet container
//hover click event
//when hover, grab the value of h3
//loop through li of every movie container
//if li value ===h3
//add class to that container to make it glow
//opposite on mouseout

getPlanetData();
getMovieData();




