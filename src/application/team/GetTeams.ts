import { prisma } from '../../infrastructure/prisma';
import { PaginatedResponse, Team } from '../../domain/team';

export class GetTeams {
  async execute(page: number = 1, limit: number = 5): Promise<PaginatedResponse<Team>> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.team.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.team.count(),
    ]);

    return {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };
  }
}