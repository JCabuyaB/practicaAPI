import fetchGeneros from './fetchGeneros';
import obtenerGenero from '../obtenerGenero';

const fetchPopulares = async (filtro = 'movie', pagina = 1) => {
    const categoria = filtro === 'movie' ? 'movie' : 'tv';


    const url = `https://api.themoviedb.org/3/${categoria}/popular?language=es-CO&page=${pagina}`;
    const options = {
        method: 'GET',
        headers:{
            accept: 'application/json',
            // token TMDB
        }
    }

    try{
        const respuesta = await fetch(url, options);
        const datos = await respuesta.json();
        const resultados = datos.results;

        // generos
        const generos = await fetchGeneros(filtro);

        // console.log(generos);
        resultados.forEach((resultado) => {
            resultado.genero = obtenerGenero(resultado.genre_ids[0], generos);
        });

        return resultados;
    }catch(e){
        console.log(e);
    }
}

export default fetchPopulares;