import { Request, Response } from 'express';
import { RegisterUser } from '../../application/auth/RegisterUser';
import { LoginUser } from '../../application/auth/LoginUser';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const useCase = new RegisterUser();
      const result = await useCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      if (error.message.startsWith('CONFLICT')) {
        return res.status(409).json({ error: error.message.replace('CONFLICT: ', '') });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const useCase = new LoginUser();
      const result = await useCase.execute(req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message.startsWith('UNAUTHORIZED')) {
        return res.status(401).json({ error: error.message.replace('UNAUTHORIZED: ', '') });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}