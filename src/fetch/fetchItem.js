const fetchItem = async (id) => {
    const categoria = document.querySelector('.main__filtros .btn--active').id;

    const url = `https://api.themoviedb.org/3/${categoria}/${id}?language=es-CO`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjBjODhiNTk4MjNmNjM5MGRkOGViNTIwMmIxMTdmOCIsIm5iZiI6MTczMDM0MDExNS42MjUwNzM0LCJzdWIiOiI2NzFlOTM3N2M3ODAyY2M1MDM1YTcxMDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5_kBQIZ5BAGfEAKqMLb-sXI3pRHmG2h2Rcy1V2DWYlU'
        }
    }

    try{
        const respuesta = await fetch(url, options);
        const resultado = await respuesta.json();

        return resultado;
    }catch(e){
        console.log(e);
    }
};

export default fetchItem;