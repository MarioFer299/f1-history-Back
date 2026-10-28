import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // 1. Limpiar datos existentes
  await prisma.interaction.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️ Base de datos limpiada.');

  // 2. Crear usuarios de prueba
  const hashedPasswordAdmin = await bcrypt.hash('Admin123!', 10);
  const hashedPasswordUser = await bcrypt.hash('User123!', 10);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador F1',
      email: 'admin@f1history.com',
      password: hashedPasswordAdmin,
      role: 'admin',
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      name: 'Usuario Prueba',
      email: 'user@f1history.com',
      password: hashedPasswordUser,
      role: 'user',
    },
  });
  console.log('👥 Usuarios de prueba creados.');

  // 3. Crear las 10 escuderías
  const teamsData = [
    { name: 'McLaren', base: 'Woking, Reino Unido', championships: 8, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/McLaren_Racing_logo.svg' },
    { name: 'Red Bull Racing', base: 'Milton Keynes, Reino Unido', championships: 6, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Red_Bull_Racing_logo.svg' },
    { name: 'Ferrari', base: 'Maranello, Italia', championships: 16, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Scuderia_Ferrari_logo.svg' },
    { name: 'Mercedes', base: 'Brackley, Reino Unido', championships: 8, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2