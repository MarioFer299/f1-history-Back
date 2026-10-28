// src/application/team/GetTeamById.ts
import { prisma } from '../../infrastructure/prisma';
import { Team } from '../../domain/team';

export class GetTeamById {
  async execute(id: string): Promise<Team | null> {
    return prisma.team.findUnique({ where: { id } });
  }
}