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
});





fetch('http://localhost:3000/api/movies')

document.addEventListener("DOMContentLoaded", () => { //para cuando cargue la pagina cargar las peliculas
    showSlides();
    cargarPeliculas(); 
});

//12
function cargarPeliculas() {
    fetch('http://localhost:3000/api/movies') // Pide al backend las peliculas
        .then(response => response.json()) // Convierte la respuesta a json
        .then(peliculas => {
            const contenedor = document.querySelector(".movies-grid");
            contenedor.innerHTML = ''; // Limpia lo que había

            peliculas.forEach(pelicula => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('movie-card');  //crea el contenido visible de cada tarjeta
                tarjeta.innerHTML = `   
                    <img src="./img/movie_gen.jpg" alt="${pelicula.titulo}">
                    <div class="movie-info">
                        <h3>${pelicula.titulo}</h3>
                        <p>ID: ${pelicula.id}</p>
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

function verPelicula(id) {

    console.log("Pelicula seleccionada:", id);

}

function verPelicula(id) {
    window.location.href = `player.html?id=${id}`;
}
