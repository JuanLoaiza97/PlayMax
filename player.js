document.addEventListener("DOMContentLoaded", () => { //espera a que toda la página HTML esté lista 

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id'); //extrar el id de la url

  if (!id) {
    document.getElementById("titulo").textContent = "Película no encontrada"; //si el id no existe en las peliculas
    return;
  }

  fetch(`http://localhost:3000/api/movies/${id}`)
    .then(response => {
      if (!response.ok) throw new Error("No se encontró la película");
      return response.json(); //si el servidor responde ok
    })
    .then(pelicula => {
      document.getElementById("titulo").textContent = pelicula.titulo; //actualiza el titulo y pone la pelicula en el reproductor
      const video = document.getElementById("reproductor");
      video.src = pelicula.url;
    })
    .catch(error => {
      document.getElementById("titulo").textContent = "Error al cargar película";
      console.error(error);
    });
});






const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    cargarTrailer(id);
} else {
    document.getElementById('titulo').textContent = "Película no encontrada";
}

// Cargar trailer de TMDb
function cargarTrailer(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=5c550f1f115db24ed0b34dc158d98e9d&language=es-ES`)
        .then(response => response.json())
        .then(data => {
            const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

            if (trailer) {
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
            } else {
                mostrarReproductorLocal();
            }
        })
        .catch(error => {
            console.error('Error al cargar el tráiler:', error);
            mostrarReproductorLocal();
        });
}

// Si no hay tráiler, muestra el video local
function mostrarReproductorLocal() {
    const titulo = document.getElementById('titulo');
    const reproductor = document.getElementById('reproductor');

    titulo.textContent = "Reproduciendo película (sin tráiler disponible)";
    reproductor.style.display = "block";
    reproductor.src = "./videos/pelicula.mp4"; // Cambia la ruta si usas otro archivo
}