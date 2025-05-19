const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de tener esto si usas .env

const connectDB = async () => {
  // Verificación de la URI antes de conectar
  if (!process.env.MONGO_URI) {
    console.error('❌ Error: MONGO_URI no está definida en las variables de entorno');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout después de 5 segundos
      socketTimeoutMS: 45000, // Cierra sockets después de 45 segundos de inactividad
    });
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    return conn; // Retorna la conexión por si necesitas usarla
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    
    // Detalles adicionales para diagnóstico
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Posibles causas:');
      console.error('- La URI de conexión es incorrecta');
      console.error('- El cluster de MongoDB no está accesible');
      console.error('- Tu IP no está en la lista de permitidas en MongoDB Atlas');
    }
    
    process.exit(1); // Termina el proceso con código de error
  }
};

module.exports = connectDB;