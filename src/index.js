import fetchPopulares from "./fetch/fetchPopulares";
import cargarPortadas from "./cargarPortadas";
import cargarGeneros from "./cargarGeneros";

// eventos
import './listeners/eventosFiltrosMain';
import './listeners/eventoGeneros';
import './listeners/eventoBusqueda';
import './listeners/eventoPortadas';
import './listeners/eventoPopup';
import './listeners/eventoPaginacion';

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