import fetchItem from "../fetch/fetchItem";

const contenedorTitulos = document.querySelector('#populares .main__grid');
const popup = document.getElementById('media');
contenedorTitulos.addEventListener('click', async (e) => {
    if(e.target.closest('div.main__media')){
        e.preventDefault();
        
        // extraer id de titulo
        const titulo = e.target.closest('div.main__media').dataset.id;

        // mostrar popup
        popup.classList.add('media--active');

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
        popup.querySelector('.media__contenedor').innerHTML = plantilla;
    }
})