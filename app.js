const express = require('express');
const cors = require('cors');
const pollaRouters = require('./routers/pollaRouters');

const app = express();
const port = 3700;

app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir enviar cookies
    optionsSuccessStatus: 200 // Algunos navegadores (IE11, SmartTVs) requieren este estatus
}));
  


app.use(express.json());
app.use('/api/polla', pollaRouters);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}/`);
});
