const express = require('express');
const cors = require('cors');
const pollaRouters = require('./routers/pollaRouters');

const app = express();
const port = 3700;

// Habilitar CORS
app.use(cors());

app.use(express.json());
app.use('/api/polla', pollaRouters);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/`);
});
