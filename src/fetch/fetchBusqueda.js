import fetchGeneros from "./fetchGeneros";
import obtenerGenero from "../obtenerGenero";

const fetchBusqueda = async (pagina = 1) => {
    const categoria = document.querySelector('.main__filtros .btn--active').id;
    const beginYear = document.getElementById('años-min').value || 1950;
    const endYear = document.getElementById('años-max').value || 2024;
    const genero = document.querySelector('#filtro-generos .btn--active')?.dataset.id || null;

    let url;
    if(categoria === 'movie'){
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-CO&page=${pagina}&release_date.gte=${beginYear}-01-01&release_date.lte=${endYear}-12-31&sort_by=popularity.desc`;

        // agregar generos en caso de no ser nulo
        genero !== null ? url+=`&with_genres=${genero}` : '';
    }else if(categoria === 'tv'){
        url = `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${beginYear}-01-01&first_air_date.lte=${endYear}-12-31&include_adult=false&include_null_first_air_dates=false&language=es-CO&page=${pagina}&sort_by=popularity.desc`;

        // agregar generos en caso de no ser nulo
        genero !== null ? url+=`&with_genres=${genero}` : '';
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // token TMDB
        }
    }

    try{
        const respuesta = await fetch(url, options);
        const datos = await respuesta.json();
        const resultados = datos.results;

        const generos = await fetchGeneros(categoria);

        resultados.forEach((elemento) => {
            elemento.genero = obtenerGenero(elemento.genre_ids[0], generos);
        });

        return resultados;
    }catch(e){
        console.log(e);
    }
};

export default fetchBusqueda;
