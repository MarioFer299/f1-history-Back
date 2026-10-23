import { Escuderia } from '@prisma/client';

export interface IEscuderiaRepository {
  findAll(page: number, limit: number): Promise<{ data: Escuderia[]; total: number }>;
  findById(id: string): Promise<Escuderia | null>;
  create(data: Omit<Escuderia, 'id'>): Promise<Escuderia>;
  update(id: string, data: Partial<Omit<Escuderia, 'id'>>): Promise<Escuderia>;
  delete(id: string): Promise<Escuderia>;
}