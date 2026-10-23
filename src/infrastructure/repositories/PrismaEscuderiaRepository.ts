import { PrismaClient, Escuderia } from '@prisma/client';
import { IEscuderiaRepository } from '../../domain/repositories/IEscuderiaRepository';

const prisma = new PrismaClient();

export class PrismaEscuderiaRepository implements IEscuderiaRepository {
  async findAll(page: number, limit: number): Promise<{ data: Escuderia[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.escuderia.findMany({ skip, take: limit, orderBy: { puntos2025: 'desc' } }),
      prisma.escuderia.count(),
    ]);
    return { data, total };
  }

  // ✅ Busca por ID exacto o por nombre (insensible a mayúsculas) para soportar URLs como /escuderias/mclaren
  async findById(id: string): Promise<Escuderia | null> {
    return prisma.escuderia.findFirst({
      where: {
        OR: [
          { id: id },
          { nombre: { contains: id, mode: 'insensitive' } }
        ]
      },
      include: {
        pilotos: true // Trae los pilotos de esta escudería
      }
    });
  }

  async create(data: Omit<Escuderia, 'id'>): Promise<Escuderia> {
    return prisma.escuderia.create({ data });
  }

  async update(id: string, data: Partial<Omit<Escuderia, 'id'>>): Promise<Escuderia> {
    return prisma.escuderia.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Escuderia> {
    return prisma.escuderia.delete({ where: { id } });
  }
}