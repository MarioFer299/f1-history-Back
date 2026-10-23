import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { GetEscuderiasUseCase } from '../../application/useCases/GetEscuderiasUseCase';
import { PrismaEscuderiaRepository } from '../../infrastructure/repositories/PrismaEscuderiaRepository';

const repository = new PrismaEscuderiaRepository();
const getEscuderiasUseCase = new GetEscuderiasUseCase(repository);

export const getEscuderias = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await getEscuderiasUseCase.execute(page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const createEscuderia = async (req: AuthRequest, res: Response) => {
  try {
    const nuevaEscuderia = await repository.create(req.body);
    res.status(201).json(nuevaEscuderia);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos para crear la escudería' });
  }
};

export const deleteEscuderia = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await repository.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Escudería no encontrada' });
  }
};