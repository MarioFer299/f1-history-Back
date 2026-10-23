import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import escuderiaRoutes from './interface/routes/escuderia.routes';
import authRoutes from './interface/routes/auth.routes';

dotenv.config();

const app = express();
app.use(express.json());

// CORS estricto con la URL de tu frontend (Obligatorio por rúbrica)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Montaje de rutas
app.use('/api/escuderias', escuderiaRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});