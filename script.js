let slideIndex = 0;
let slideInterval; // Variable para almacenar el ID del intervalo

function showSlides() {
    let i;
    const slides = document.querySelectorAll(".slider-item");
    const dots = document.querySelectorAll(".dot");

    // Ocultar todas las diapositivas
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remover la clase 'active-dot' de todos los puntos
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }

    // Mover al siguiente slide
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; // Volver al primer slide si se llega al final
    }

    // Mostrar el slide actual y activar el punto correspondiente
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active-dot");

    // Reiniciar el intervalo cada vez que se muestra un nuevo slide
    // para evitar saltos si el usuario interactúa manualmente
    startAutoSlide();
}

function plusSlides(n) {
    stopAutoSlide(); // Detener el auto-slide al navegar manualmente
    showManualSlide(slideIndex += n);
}

function currentSlide(n) {
    stopAutoSlide(); // Detener el auto-slide al navegar manualmente
    showManualSlide(slideIndex = n);
}

// Función para mostrar un slide específico (usada por plusSlides y currentSlide)
function showManualSlide(n) {
    let i;
    const slides = document.querySelectorAll(".slider-item");
    const dots = document.querySelectorAll(".dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active-dot");
    startAutoSlide(); // Reiniciar el auto-slide después de la navegación manual
}


function startAutoSlide() {
    // Limpiar cualquier intervalo existente antes de iniciar uno nuevo
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    // Iniciar el intervalo: cambia de slide cada 5000ms (5 segundos)
    slideInterval = setInterval(showSlides, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Iniciar el slider cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
    showSlides(); // Muestra el primer slide y empieza el contador
    cargarPeliculas(); // Cargar las películas al inicio
});







//prueba 
//fetch('http://localhost:3000/api/movies')


window.peliculas = [];// Variable para almacenar las películas




function cargarPeliculas() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=5c550f1f115db24ed0b34dc158d98e9d&language=es-ES&page=1') // api para obtener informacion de las películas
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })


        .then(data => {
            window.peliculas = data.results;
            const contenedor = document.querySelector(".movies-grid"); 
            contenedor.innerHTML = ''; // Limpia lo que había

            peliculas.forEach(pelicula => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('movie-card'); //pone la informacion de cada pelicula en cada tarjeta
                tarjeta.innerHTML = `   
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                    <div class="movie-info"> 
                        <h3>${pelicula.title}</h3>
                        <p>Fecha de estreno: ${pelicula.release_date}</p>
                        <button class="card-watch-button" onclick="verPelicula('${pelicula.id}')">Ver Ahora</button>
                    </div>
                `;
                contenedor.appendChild(tarjeta);    
            });
        })
        .catch(error => {
            console.error('Error al cargar películas:', error);
        });
}

GuardarEnHistorial({
  titulo: "Ejemplo",
  genero: "Drama",
  duracion: "2h",
  imagen: "https://via.placeholder.com/150"
});
