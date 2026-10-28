import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './interface/routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware global
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'F1 History Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});