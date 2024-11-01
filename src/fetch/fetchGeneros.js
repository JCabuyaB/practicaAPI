const fetchGeneros = async (filtro = 'movie') => {
    const categoria = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${categoria}/list?language=es`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjBjODhiNTk4MjNmNjM5MGRkOGViNTIwMmIxMTdmOCIsIm5iZiI6MTczMDE1NzAzOS4zMjIxOTUsInN1YiI6IjY3MWU5Mzc3Yzc4MDJjYzUwMzVhNzEwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.35uh8T8RcNFKWQjVgL1swehrXCcLAef8kx9ety1cuG8'
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