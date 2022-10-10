/*
    Feladat:
    1.
        - Form submit eseményre szedd ki az input mezőkben lévő értékeket
        - Ha a keresőszó üres, dobj fel alert dobozt "Keresőszó kitöltése kötelező" felirattal
        - Ha van keresőszó, akkor encodeURI() beépített function-nel alakítsd át URL kompatibilis formára
        - Küldj AJAX kérést GET methoddal a
          http://www.omdbapi.com/?s={keresőszó}&y={évszám}&apiKey=9606ae0f URL-re
        - A válaszként kapott filmeket rendereld ki a "movies" id-jú element belsejébe,
           az alábbi template alapján:
            <li>
              <div class="poster-wrap">
                <a>
                  <img src="{Borítókép (Poster)}" class="movie-poster" />
                </a>
              </div>
              <p data-imdbid="{Egyedi azonosító (imdbID)}" class="single-movie-btn">
                <span class="movie-title">
                  {Cím (Title)}
                </span>
              </p>
              <span class="movie-year">
                {Évszám (Year)}
              </span>
            </li>
    2.
        - Címre kattintva az adott id-jú film kapcsán küldj ki AJAX kérést GET methoddal a
          http://www.omdbapi.com/?i={Egyedi azonosító (imdbID)}&apiKey=9606ae0f URL-re
        - A szerver válaszát jelenítsd meg a felhasználónak
*/

document.getElementById('search').onsubmit = async function (event) {
    event.preventDefault();
    let searchTitle = event.target.elements.search.value;
    let searchYear = event.target.elements.year.value;
    if (searchYear === '') {
        alert('Keresőszó kitöltése kötelező');
    } else {
        searchTitle = encodeURI(searchTitle);
    }

    let url = `http://www.omdbapi.com/?s=${searchTitle}&y=${searchYear}&apiKey=9606ae0f`

    let respose = await fetch(url);
    if (!respose.ok) {
        alert('A keresés sikertelen');
        return;
    }

    let movies = await respose.json();

    if (!movies.Search) {
        alert('A keresés sikertelen');
        return;
    }

    moviesRenderList(movies.Search);
}


function moviesRenderList(movieslist) {
    let movieHTML = '';
    for (let movie of movieslist) {
        movieHTML += `<li>
            <div class="poster-wrap">
                <a>
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" class="movie-poster"/>
                </a>
            </div>
            <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
                <span class="movie-title">
                    ${movie.Title}
                </span>
            </p>
            <span class="movie-year">
                ${movie.Year}
            </span>
        </li>`
    }
    document.getElementById('movies').innerHTML = movieHTML;
}
