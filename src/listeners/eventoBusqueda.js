import cargarPortadas from "../cargarPortadas";
import fetchBusqueda from "../fetch/fetchBusqueda";

const btnBuscar = document.getElementById('btn-buscar');
btnBuscar.addEventListener('click', async () => {
    // obtener resultados de busqueda
    const resultado = await fetchBusqueda();

    // cargar resultados al DOM
    cargarPortadas(resultado);
});