import { prisma } from '../../infrastructure/prisma';

export class DeleteTeam {
  async execute(id: string): Promise<void> {
    await prisma.team.delete({ where: { id } });
  }
}