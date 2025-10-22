import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Importación de rutas
import direccionNucleoRoutes from './routes/coreDirectionRoutes.js';
import colegiosRoutes from './routes/Colegio.js';
import headquartersRoutes from './routes/headquarters.js';
import periodsRoutes from './routes/periods.js';

// Middleware personalizado
import mockUser from './middlewares/mockUser.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(mockUser);

// Rutas principales
app.use('/api', direccionNucleoRoutes);
app.use('/api', colegiosRoutes);
app.use('/api/sedes', headquartersRoutes);
app.use('/api/periods', periodsRoutes);

// Montar la versión en español de periodos si existe
try {
  const periodsRoutesEs = await import('./routes/periodos.js');
  if (periodsRoutesEs.default) app.use('/api/periodos', periodsRoutesEs.default);
} catch (err) {
  console.log('No existe la ruta en español /periodos, se omite.');
}

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('🛑 Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB conectado correctamente'))
  .catch((err) => console.error('❌ Error al conectar con MongoDB:', err));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
