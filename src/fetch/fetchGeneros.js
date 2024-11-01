const fetchGeneros = async (filtro = 'movie') => {
    const categoria = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${categoria}/list?language=es`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // token TMDB
        }
    }
    

    try{
        const resultado = await fetch(url, options);
        const datos = await resultado.json();
        
        return datos.genres;
    }catch(e){
        console.log(e);
    }
};

export default fetchGeneros;
