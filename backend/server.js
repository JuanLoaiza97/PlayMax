const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const moviesRoutes = require('./routes/movies');
app.use('/api/movies', moviesRoutes); 

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});


