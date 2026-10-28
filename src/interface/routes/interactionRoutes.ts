// src/interface/routes/interactionRoutes.ts
import { Router } from 'express';
import { InteractionController } from '../controllers/interactionController';
import { authenticate } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { z } from 'zod';

const router = Router();
const interactionController = new InteractionController();

const interactionSchema = z.object({
  teamId: z.string().uuid().optional(),
  message: z.string().optional(),
  type: z.enum(['newsletter', 'contact'], { errorMap: () => ({ message: 'Tipo de interacción inválido' }) }),
});

// POST: Usuario autenticado (Cualquier rol)
router.post('/', authenticate, (req, res) => {
  const validation = interactionSchema.safeParse(req.body);
  if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });
  interactionController.create(req, res);
});

// GET /mias: Usuario autenticado (Solo las suyas)
router.get('/mias', authenticate, (req, res) => interactionController.getMyInteractions(req, res));

// GET /: Solo Admin (Todas las interacciones)
router.get('/', authenticate, requireRole(['admin']), (req, res) => interactionController.getAll(req, res));

export default router;