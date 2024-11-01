import fetchGeneros from "./fetch/fetchGeneros";

const contenedorGeneros = document.getElementById("filtro-generos");
const cargarGeneros = async (filtro = 'movie') => {
    contenedorGeneros.innerHTML = '';
    try {
        const generos = await fetchGeneros(filtro);

        generos.forEach((elemento) => {
            const btnGenero = document.createElement("btn");
            btnGenero.setAttribute("data-id", elemento.id);
            btnGenero.classList.add("btn");
            btnGenero.innerText = elemento.name;

            contenedorGeneros.appendChild(btnGenero);
        });
    } catch (e) {
        console.log(e);
    }
};

export default cargarGeneros;