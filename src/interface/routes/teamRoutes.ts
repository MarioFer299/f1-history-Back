import { Router } from 'express';
import { TeamController } from '../controllers/teamController';
import { authenticate } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { z } from 'zod';

const router = Router();
const teamController = new TeamController();

const teamSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  base: z.string().min(2, 'La base es requerida'),
  championships: z.number().int().min(0, 'Debe ser un número entero positivo'),
  logoUrl: z.string().url('Debe ser una URL válida'),
});

// Rutas Públicas
router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

// Rutas Protegidas (Solo Admin)
router.post('/', authenticate, requireRole(['admin']), (req, res) => {
  const validation = teamSchema.safeParse(req.body);
  if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });
  teamController.create(req, res);
});

router.put('/:id', authenticate, requireRole(['admin']), (req, res) => {
  const validation = teamSchema.partial().safeParse(req.body);
  if (!validation.success) return res.status(400).json({ error: validation.error.errors[0].message });
  teamController.update(req, res);
});

router.delete('/:id', authenticate, requireRole(['admin']), (req, res) => teamController.delete(req, res));

export default router;