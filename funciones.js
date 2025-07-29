import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// configuración de Firebase
const firebaseConfig = {
        apiKey: "AIzaSyC7PhfZwbP7QcZO8vCKwSQuuTjKt7Br4OQ",
        authDomain: "playmax-6bc40.firebaseapp.com",
        databaseURL: "https://playmax-6bc40-default-rtdb.firebaseio.com",
        projectId: "playmax-6bc40",
        storageBucket: "playmax-6bc40.firebasestorage.app",
        messagingSenderId: "972267905771",
        appId: "1:972267905771:web:485787c59922ce951094ae",
        measurementId: "G-GMYC8DCLTF"
};

// Inicializar Firebase y base de datos
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


function GuardarEnHistorial(pelicula) {
  const historialRef = ref(db, 'historial/');
  const nuevaPeliculaRef = push(historialRef); // crea una entrada única

  set(nuevaPeliculaRef, {
    titulo: pelicula.titulo,
    genero: pelicula.genero,
    duracion: pelicula.duracion,
    imagen: pelicula.imagen,
    fecha: Date.now() // para ordenar por fecha
  })
  .then(() => {
    console.log("Pelicula guardada en el historial");
  })
  .catch((error) => {
    console.error("Error al guardar la pelicula en el historial:", error);
  });
}



function verPelicula(id) {  
    const pelicula = window.peliculas.find(p => p.id === parseInt(id));

  if (pelicula) {
    GuardarEnHistorial({
            titulo: pelicula.title,
            genero: "Desconocido",
            duracion: "Desconocida",
            imagen: `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
        });
    window.location.href = `player.html?id=${id}`;
  }
}   

window.verPelicula = verPelicula;
window.GuardarEnHistorial = GuardarEnHistorial;

GuardarEnHistorial({
  titulo: "Ejemplo de prueba",
  genero: "Acción",
  duracion: "1h 45min",
  imagen: "https://via.placeholder.com/150"
});
