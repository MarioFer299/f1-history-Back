import { prisma } from '../../infrastructure/prisma';
import { Interaction } from '../../domain/interaction';

export class GetMyInteractions {
  async execute(userId: string): Promise<Interaction[]> {
    return prisma.interaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}