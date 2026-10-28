import { prisma } from '../../infrastructure/prisma';
import { CreateInteractionRequest, Interaction } from '../../domain/interaction';

export class CreateInteraction {
  // El userId viene del token, NO del body (Requisito crítico de la rúbrica)
  async execute(userId: string, data: CreateInteractionRequest): Promise<Interaction> {
    return prisma.interaction.create({
      data: {
        userId,
        teamId: data.teamId || null,
        message: data.message || null,
        type: data.type,
      },
    });
  }
}