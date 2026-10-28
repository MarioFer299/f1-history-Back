import { prisma } from '../../infrastructure/prisma';
import { LoginRequest, AuthResponse, JwtPayload } from '../../domain/auth';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class LoginUser {
  async execute(data: LoginRequest): Promise<AuthResponse> {
    // 1. Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    // 2. Validar credenciales (Rúbrica: mensaje genérico 401, no revelar si falló email o pass)
    if (!user) {
      throw new Error('UNAUTHORIZED: Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('UNAUTHORIZED: Credenciales inválidas');
    }

    // 3. Generar JWT (Rúbrica: payload mínimo, sin contraseña, con expiración)
    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    // 4. Retornar respuesta (Rúbrica: nunca devolver la contraseña)
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