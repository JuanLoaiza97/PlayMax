import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth(app);

function GuardarEnHistorial(pelicula) {
  // Verificar si hay un usuario autenticado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado, proceder a guardar
      const historialRef = ref(db, `historial/${user.uid}`);
      const nuevaPeliculaRef = push(historialRef);

      set(nuevaPeliculaRef, {
        titulo: pelicula.titulo,
        genero: pelicula.genero,
        duracion: pelicula.duracion,
        imagen: pelicula.imagen,
        fecha: Date.now()
      })
      .then(() => {
        console.log("Pelicula guardada en el historial");
      })
      .catch((error) => {
        console.error("Error al guardar la pelicula en el historial:", error);
      });
    } else {
      console.log("Usuario no autenticado, no se puede guardar en Firebase");
      // Opcionalmente guardar en localStorage como respaldo
      try {
        let historialLocal = JSON.parse(localStorage.getItem('historial') || '[]');
        historialLocal.push({
          ...pelicula,
          fecha: Date.now()
        });
        localStorage.setItem('historial', JSON.stringify(historialLocal));
        console.log("Guardado en historial local");
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
      }
    }
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