const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// crear servidor express
const app = express();


// base de datos
  dbConnection();

  // CORS
  app.use(cors());
// middeware USE
// Directorio publico
app.use(express.static('public'));
// lectura y parsio del body
app.use(express.json());


// definir rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/event'));

app.get('/*',(req,res) => {
			res.sendFile( __dirname + '/public/index.html');
});

// app.get('/',(req, res) => {

//     res.json({
//         ok: true,
//     });
// });

app.listen(process.env.PORT, ( ) => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})