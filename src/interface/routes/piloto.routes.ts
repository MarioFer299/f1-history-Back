import { Router } from 'express';
import { getAllPilotos, getPilotoById } from '../controllers/piloto.controller';

const router = Router();

// ✅ NUEVA RUTA: Obtener todos los pilotos (va PRIMERO)
router.get('/', getAllPilotos);

// RUTA EXISTENTE: Obtener un piloto por ID o nombre
router.get('/:id', getPilotoById);

export default router;