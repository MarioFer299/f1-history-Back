import { Router } from 'express';
import { getEscuderias, createEscuderia, deleteEscuderia } from '../controllers/escuderia.controller';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// Públicas
router.get('/', getEscuderias);

// Protegidas: Solo Admin
router.post('/', authenticate, requireAdmin, createEscuderia);
router.delete('/:id', authenticate, requireAdmin, deleteEscuderia);

export default router;