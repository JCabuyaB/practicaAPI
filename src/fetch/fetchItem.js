const fetchItem = async (id) => {
    const categoria = document.querySelector('.main__filtros .btn--active').id;

    const url = `https://api.themoviedb.org/3/${categoria}/${id}?language=es-CO`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            // token TMDB
        }
    }

    try{
        const respuesta = await fetch(url, options);
        const resultado = await respuesta.json();

        return resultado;
    }catch(e){
        console.log(e);
    }
};

export default fetchItem;
