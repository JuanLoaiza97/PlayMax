

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        cargarTrailer(id);
    } else {
        document.getElementById('titulo').textContent = "Película no encontrada";
    }
});

// Cargar trailer de TMDb
function cargarTrailer(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=5c550f1f115db24ed0b34dc158d98e9d&language=es-ES`)
        .then(response => response.json())
        .then(data => {
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

            if (trailer) {
                reproductor(trailer);
            }
            else {
              fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=5c550f1f115db24ed0b34dc158d98e9d&language=en-US`)
              .then(response => response.json())
              .then(data => {
              const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

              if (trailer) {
                reproductor(trailer);
              }
              else {
                mostrarMensajeError();
              } 
            })
                    .catch(error => {
                        console.error('Error al cargar el tráiler:', error);
                    });
            }
        });
} 



function reproductor(trailer){
  const reproductor = document.getElementById('reproductor');
                const titulo = document.getElementById('titulo');

                reproductor.style.display = "none"; // Oculta el reproductor por defecto si hay tráiler

                const iframe = document.createElement('iframe');
                iframe.width = "800";
                iframe.height = "450";
                iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;

                titulo.textContent = "Disfruta el tráiler";
                document.querySelector("main").appendChild(iframe);
                
            }





function mostrarMensajeError() {
    const titulo = document.getElementById('titulo');
    titulo.textContent = "No hay contenido de video disponible para esta película";
    document.getElementById('reproductor').style.display = "none";
}     