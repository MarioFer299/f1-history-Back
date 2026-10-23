import { Router } from 'express';
import { getEscuderias, createEscuderia, deleteEscuderia, getEscuderiaById } from '../controllers/escuderia.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getEscuderias);
router.get('/:id', getEscuderiaById); // ✅ NUEVA RUTA PARA DETALLE
router.post('/', authenticate, requireAdmin, createEscuderia);
router.delete('/:id', authenticate, requireAdmin, deleteEscuderia);

export default router;