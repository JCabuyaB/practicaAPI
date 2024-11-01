'use strict';

const fetchGeneros = async (filtro = 'movie') => {
    const categoria = filtro === 'movie' ? 'movie' : 'tv';

    const url = `https://api.themoviedb.org/3/genre/${categoria}/list?language=es`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            // token TMDB
        }
    };
    

    try{
        const resultado = await fetch(url, options);
        const datos = await resultado.json();
        
        return datos.genres;
    }catch(e){
        console.log(e);
    }
};

const obtenerGenero = (id_genero, generos) => {
    let genero;

    generos.forEach((elemento) => {
        if(id_genero === elemento.id){
            genero = elemento.name;
        }
    });

    return genero;
};

const fetchPopulares = async (filtro = 'movie', pagina = 1) => {
    const categoria = filtro === 'movie' ? 'movie' : 'tv';


    const url = `https://api.themoviedb.org/3/${categoria}/popular?language=es-CO&page=${pagina}`;
    const options = {
        method: 'GET',
        headers:{
            accept: 'application/json',
            // token TMDB
        }
    };

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
};

const contenedorMedia = populares.querySelector("#populares .main__grid");
const cargarPortadas = (resultados) => {
    contenedorMedia.innerHTML = '';

    resultados.forEach(element => {
        const plantilla = `
            <div class="main__media" data-id="${element.id}">
                <a href="#" class="main__media-thumb">
                    <img class="main__media-img" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" />
                </a>
                <p class="main__media-titulo">${element.title || element.name}</p>
                <p class="main__media-fecha">${element.genero || element.release_date || element.first_air_date}</p>
            </div>
        `;

        contenedorMedia.insertAdjacentHTML('beforeend', plantilla);
    });


};

const contenedorGeneros$1 = document.getElementById("filtro-generos");
const cargarGeneros = async (filtro = 'movie') => {
    contenedorGeneros$1.innerHTML = '';
    try {
        const generos = await fetchGeneros(filtro);

        generos.forEach((elemento) => {
            const btnGenero = document.createElement("btn");
            btnGenero.setAttribute("data-id", elemento.id);
            btnGenero.classList.add("btn");
            btnGenero.innerText = elemento.name;

            contenedorGeneros$1.appendChild(btnGenero);
        });
    } catch (e) {
        console.log(e);
    }
};

// botones
const peliculasBtn = document.getElementById('movie');
const seriesBtn = document.getElementById('tv');

// peliculas
peliculasBtn.addEventListener('click', async (e) => {
    // obtener peliculas
    const peliculas = await fetchPopulares();
    
    // cargarl al DOM
    cargarPortadas(peliculas);
    cargarGeneros();

    // estilos de botones
    peliculasBtn.classList.add('btn--active');
    seriesBtn.classList.remove('btn--active');
});

// series
seriesBtn.addEventListener('click', async (e) => {
    // obtener series
    const series = await fetchPopulares('tv');

    // cargarlas al DOM
    cargarPortadas(series);
    cargarGeneros('tv');

    // estilos de botones
    seriesBtn.classList.add('btn--active');
    peliculasBtn.classList.remove('btn--active');
});

// marcar genero
const contenedorGeneros = document.getElementById('filtro-generos');
contenedorGeneros.addEventListener('click', (e) => {
    if(e.target.closest('btn')){
        document.getElementById('populares').dataset.pagina = 1;

        // remover clase activa del boton que la tenga
        contenedorGeneros.querySelector('.btn--active')?.classList.remove('btn--active');

        // agregar clase activa
        e.target.closest('btn').classList.add('btn--active');
    }
});

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
    };

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

const btnBuscar = document.getElementById('btn-buscar');
btnBuscar.addEventListener('click', async () => {
    // obtener resultados de busqueda
    const resultado = await fetchBusqueda();

    // cargar resultados al DOM
    cargarPortadas(resultado);
});

const fetchItem = async (id) => {
    const categoria = document.querySelector('.main__filtros .btn--active').id;

    const url = `https://api.themoviedb.org/3/${categoria}/${id}?language=es-CO`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            // token TMDB
        }
    };

    try{
        const respuesta = await fetch(url, options);
        const resultado = await respuesta.json();

        return resultado;
    }catch(e){
        console.log(e);
    }
};

const contenedorTitulos = document.querySelector('#populares .main__grid');
const popup$1 = document.getElementById('media');
contenedorTitulos.addEventListener('click', async (e) => {
    if(e.target.closest('div.main__media')){
        e.preventDefault();
        
        // extraer id de titulo
        const titulo = e.target.closest('div.main__media').dataset.id;

        // mostrar popup
        popup$1.classList.add('media--active');

        const contenidoPopup = await fetchItem(titulo);

        const plantilla = `
        <div class="media__backdrop">
            <img
                src="https://image.tmdb.org/t/p/w500/${contenidoPopup.backdrop_path}"
                class="media__backdrop-image"
            />
        </div>
        <div class="media__imagen">
            <img
                src="https://image.tmdb.org/t/p/w500/${contenidoPopup.poster_path}"
                class="media__poster"
            />
        </div>
        <div class="media__info">
            <h1 class="media__titulo">${contenidoPopup.title}</h1>
            <p class="media__fecha">${contenidoPopup.release_date}</p>
            <p class="media__overview">${contenidoPopup.overview}</p>
        </div>
        <button class="media__btn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                class="media__btn-icono"
            >
                <path
                    d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
            </svg>
        </button>
        `;

        // agregar contenido al popup
        popup$1.querySelector('.media__contenedor').innerHTML = plantilla;
    }
});

const popupContenido = document.querySelector('#media .media__contenedor');
const popup = document.getElementById('media');
popupContenido.addEventListener('click', (e) => {
    if(e.target.closest('button.media__btn')){
        popup.classList.remove('media--active');
        popupContenido.innerHTML = '';
    }
});

const anterior = document.getElementById("pagina-anterior");
const siguiente = document.getElementById("pagina-siguiente");


document.querySelector('.main__filtros .btn--active').id;

anterior.addEventListener("click", async () => {
    const paginaActual = document.getElementById('populares').dataset.pagina;

    // peticion populares siguiente pagina
    if(paginaActual > 1){
        try{
            // peticion populares siguiente pagina
            const resultados = await fetchBusqueda(parseInt(paginaActual) - 1);

            // actualizar pagina 
            document.getElementById('populares').dataset.pagina = parseInt(paginaActual) - 1; 

            // cargar al DOM
            cargarPortadas(resultados);

            window.scrollTo(0,0);
        }catch(e){
            console.log(e);
        }  
    }
});

siguiente.addEventListener("click", async () => {
    const paginaActual = document.getElementById('populares').dataset.pagina;

    try{
        // peticion populares siguiente pagina
        const resultados = await fetchBusqueda(parseInt(paginaActual) + 1);

        // actualizar pagina 
        document.getElementById('populares').dataset.pagina = parseInt(paginaActual) + 1; 

        // cargar al DOM
        cargarPortadas(resultados);

        window.scrollTo(0,0);
    }catch(e){
        console.log(e);
    }
    
});

const cargarContenido = async () => {
    try {
        // peticion para peliculas/series
        const elementos = await fetchPopulares();
        // cargar elementos en el DOM
        cargarPortadas(elementos);
    } catch (e) {
        console.log(e);
    }
};



cargarContenido();
cargarGeneros();
//# sourceMappingURL=bundle.js.map
