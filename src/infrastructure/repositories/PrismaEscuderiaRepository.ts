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

  // ✅ Busca por ID exacto o por nombre normalizado (soporta "redbull", "mclaren", etc.)
  async findById(id: string): Promise<Escuderia | null> {
    // 1. Primero intentar por ID exacto (UUID)
    const byId = await prisma.escuderia.findUnique({
      where: { id },
      include: { pilotos: true }
    });
    
    if (byId) return byId;

    // 2. Si no es UUID, buscar por nombre normalizado
    const normalizedSearch = id.toLowerCase().replace(/[\s-]/g, '');
    
    const escuderias = await prisma.escuderia.findMany({
      include: { pilotos: true }
    });

    // 3. Buscar coincidencia flexible
    const found = escuderias.find(esc => {
      const normalizedName = esc.nombre.toLowerCase().replace(/[\s-]/g, '');
      return normalizedName.includes(normalizedSearch) || 
             normalizedSearch.includes(normalizedName);
    });

    return found || null;
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