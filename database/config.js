const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Base de datos : conectado');
    } catch (error) {
        
        console.log(error);
        console.log('Error en la base de datos : no conectado');
    }
}

module.exports = {
    dbConnection
}