import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './interface/routes/authRoutes';
import teamRoutes from './interface/routes/teamRoutes';
import interactionRoutes from './interface/routes/interactionRoutes'; // <-- AGREGAR

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/interactions', interactionRoutes); // <-- AGREGAR

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'F1 History Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});