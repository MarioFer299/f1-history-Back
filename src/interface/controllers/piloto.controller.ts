import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ NUEVA FUNCIÓN: Obtener TODOS los pilotos
export const getAllPilotos = async (req: Request, res: Response) => {
  try {
    const pilotos = await prisma.piloto.findMany({
      include: {
        escuderia: true // Incluye el nombre y color de la escudería
      },
      orderBy: {
        nombre: 'asc'
      }
    });

    res.json(pilotos);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// FUNCIÓN EXISTENTE: Obtener un piloto por ID o nombre
export const getPilotoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const piloto = await prisma.piloto.findFirst({
      where: {
        OR: [
          { id: id },
          { nombre: { contains: id, mode: 'insensitive' } }
        ]
      },
      include: {
        escuderia: true
      }
    });

    if (!piloto) {
      return res.status(404).json({ error: 'Piloto no encontrado' });
    }

    res.json(piloto);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};