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

export default cargarPortadas;