import { prisma } from '../../infrastructure/prisma';
import { UpdateTeamRequest, Team } from '../../domain/team';

export class UpdateTeam {
  async execute(id: string, data: UpdateTeamRequest): Promise<Team> {
    return prisma.team.update({ where: { id }, data });
  }
}