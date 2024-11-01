import cargarPortadas from "../cargarPortadas";
import fetchBusqueda from "../fetch/fetchBusqueda";

const anterior = document.getElementById("pagina-anterior");
const siguiente = document.getElementById("pagina-siguiente");


const categoria = document.querySelector('.main__filtros .btn--active').id;

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
            console.log(e)
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