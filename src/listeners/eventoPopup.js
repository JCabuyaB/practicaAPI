const popupContenido = document.querySelector('#media .media__contenedor');
const popup = document.getElementById('media');
popupContenido.addEventListener('click', (e) => {
    if(e.target.closest('button.media__btn')){
        popup.classList.remove('media--active');
        popupContenido.innerHTML = '';
    }
})