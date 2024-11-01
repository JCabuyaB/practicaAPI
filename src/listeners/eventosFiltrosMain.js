import cargarGeneros from "../cargarGeneros";
import cargarPortadas from "../cargarPortadas";
import fetchPopulares from "../fetch/fetchPopulares";

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