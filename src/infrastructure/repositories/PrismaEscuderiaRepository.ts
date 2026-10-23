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

  async findById(id: string): Promise<Escuderia | null> {
    return prisma.escuderia.findUnique({ where: { id } });
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