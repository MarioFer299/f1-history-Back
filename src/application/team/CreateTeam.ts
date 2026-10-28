import { prisma } from '../../infrastructure/prisma';
import { CreateTeamRequest, Team } from '../../domain/team';

export class CreateTeam {
  async execute(data: CreateTeamRequest): Promise<Team> {
    return prisma.team.create({ data });
  }
}