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