const obtenerGenero = (id_genero, generos) => {
    let genero;

    generos.forEach((elemento) => {
        if(id_genero === elemento.id){
            genero = elemento.name;
        }
    });

    return genero;
}

export default obtenerGenero;