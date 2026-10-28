import { prisma } from '../../infrastructure/prisma';
import { RegisterRequest } from '../../domain/auth';
import * as bcrypt from 'bcrypt';

export class RegisterUser {
  async execute(data: RegisterRequest) {
    // 1. Verificar si el email ya existe (Rúbrica: responder 409)
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('CONFLICT: El correo electrónico ya está registrado');
    }

    // 2. Hashear la contraseña (Rúbrica: nunca en texto plano)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Crear el usuario
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'user', // Por defecto es user
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}