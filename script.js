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