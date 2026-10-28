import { prisma } from '../../infrastructure/prisma';
import { LoginRequest, AuthResponse, JwtPayload } from '../../domain/auth';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class LoginUser {
  async execute(data: LoginRequest): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('UNAUTHORIZED: Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('UNAUTHORIZED: Credenciales inválidas');
    }

    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    // CORRECCIÓN DEFINITIVA: 'as any' evita el conflicto de tipos estrictos de jsonwebtoken
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d',
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}