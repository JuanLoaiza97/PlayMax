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

GuardarEnHistorial({
  titulo: "Ejemplo",
  genero: "Drama",
  duracion: "2h",
  imagen: "https://via.placeholder.com/150"
});

