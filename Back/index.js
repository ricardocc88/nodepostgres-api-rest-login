

// Importar los módulos necesarios
import 'dotenv/config'
import express from 'express';

import userRouter from './routes/user.route.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1/users',userRouter)

app.use('/api/v1/users',userRouter)

// Definir una ruta básica
// app.get('/', (req, res) => {
//   res.send('Hola Mundo');
// });

// Definir el puerto en el que el servidor va a escuchar
const port = process.env.PORT || 3000;

// Iniciar el servidor y escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});