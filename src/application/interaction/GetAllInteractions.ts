import { prisma } from '../../infrastructure/prisma';
import { Interaction } from '../../domain/interaction';

export class GetAllInteractions {
  async execute(): Promise<Interaction[]> {
    return prisma.interaction.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } }, // Útil para el admin
    });
  }
}