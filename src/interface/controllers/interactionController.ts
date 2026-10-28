// src/interface/controllers/interactionController.ts
import { Request, Response } from 'express';
import { CreateInteraction } from '../../application/interaction/CreateInteraction';
import { GetMyInteractions } from '../../application/interaction/GetMyInteractions';
import { GetAllInteractions } from '../../application/interaction/GetAllInteractions';

export class InteractionController {
  async create(req: Request, res: Response) {
    try {
      // Tomamos el ID del token (req.user), nunca de req.body
      const userId = req.user!.id; 
      const useCase = new CreateInteraction();
      const result = await useCase.execute(userId, req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getMyInteractions(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const useCase = new GetMyInteractions();
      const result = await useCase.execute(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllInteractions();
      const result = await useCase.execute();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}