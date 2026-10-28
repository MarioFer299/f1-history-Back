import { Request, Response } from 'express';
import { GetTeams } from '../../application/team/GetTeams';
import { GetTeamById } from '../../application/team/GetTeamById';
import { CreateTeam } from '../../application/team/CreateTeam';
import { UpdateTeam } from '../../application/team/UpdateTeam';
import { DeleteTeam } from '../../application/team/DeleteTeam';

export class TeamController {
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const useCase = new GetTeams();
      const result = await useCase.execute(page, limit);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const useCase = new GetTeamById();
      const result = await useCase.execute(req.params.id);
      if (!result) return res.status(404).json({ error: 'Escudería no encontrada' });
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const useCase = new CreateTeam();
      const result = await useCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const useCase = new UpdateTeam();
      const result = await useCase.execute(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.code === 'P2025') return res.status(404).json({ error: 'Escudería no encontrada' });
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const useCase = new DeleteTeam();
      await useCase.execute(req.params.id);
      return res.status(200).json({ message: 'Escudería eliminada' });
    } catch (error: any) {
      if (error.code === 'P2025') return res.status(404).json({ error: 'Escudería no encontrada' });
      return res.status(400).json({ error: error.message });
    }
  }
}