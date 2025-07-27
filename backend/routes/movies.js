const express = require('express'); 
const router = express.Router();    //serivor para las rutas de peliculas

 const peliculas= [
        { id: '1', titulo: 'Orgullo y prejuicio', url: 'https://mi-cdn.com/pelicula1.mp4' },
        { id: '2', titulo: 'La La Land', url: 'https://mi-cdn.com/pelicula2.mp4' },
        { id: '3', titulo: 'Inception', url: 'https://mi-cdn.com/pelicula3.mp4' }
    ];

router.get('/', (req, res) => {
    res.json(peliculas);
});

module.exports = router; // Exportar las rutas de películas para el servidor principal

router.get('/:id', (req, res) => {
    res.json(peliculas);
}); 

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const pelicula = peliculas.find(p => p.id === id);
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ error: 'Pelicula no encontrada' });
    }
}); 

module.exports = router; 
