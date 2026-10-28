import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { z } from 'zod'; // Validación de la rúbrica

const router = Router();
const authController = new AuthController();

// Esquemas de validación con Zod
const registerSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

router.post('/register', (req, res) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }
  authController.register(req, res);
});

router.post('/login', (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }
  authController.login(req, res);
});

export default router;