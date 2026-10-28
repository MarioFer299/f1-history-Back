import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // 1. Limpiar datos existentes (en orden inverso a las dependencias)
  await prisma.interaction.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();

  // 2. Crear usuarios de prueba (Contraseñas hasheadas con bcrypt)
  const hashedPasswordAdmin = await bcrypt.hash('Admin123!', 10);
  const hashedPasswordUser = await bcrypt.hash('User123!', 10);

  await prisma.user.create({
    data: {
      name: 'Administrador F1',
      email: 'admin@f1history.com',
      password: hashedPasswordAdmin,
      role: 'admin',
    },
  });

  await prisma.user.create({
    data: {
      name: 'Usuario Prueba',
      email: 'user@f1history.com',
      password: hashedPasswordUser,
      role: 'user',
    },
  });

  // 3. Crear las 10 escuderías de la temporada 2025
  const teams = [
    { name: 'McLaren', base: 'Woking, Reino Unido', championships: 8, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/McLaren_Racing_logo.svg' },
    { name: 'Red Bull Racing', base: 'Milton Keynes, Reino Unido', championships: 6, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7e/Red_Bull_Racing_logo.svg' },
    { name: 'Ferrari', base: 'Maranello, Italia', championships: 16, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Scuderia_Ferrari_logo.svg' },
    { name: 'Mercedes', base: 'Brackley, Reino Unido', championships: 8, logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Mercedes_AMG_Petronas_F1_Team_Logo.svg' },
    { name: 'Aston Martin', base: 'Silverstone, Reino Unido', championships: 0, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/1/18/Aston_Martin_Aramco_Cognizant_F1_Team_Logo.svg' },
    { name: 'Alpine', base: 'Enstone, Reino Unido', championships: 2, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Alpine_F1_Team_Logo.svg' },
    { name: 'Haas F1 Team', base: 'Kannapolis, EE. UU.', championships: 0, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Haas_F1_Team_logo.svg' },
    { name: 'RB (Visa Cash App RB)', base: 'Faenza, Italia', championships: 0, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/RB_Formula_One_Team_logo.svg' },
    { name: 'Kick Sauber', base: 'Hinwil, Suiza', championships: 0, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/Sauber_Motorsport_logo.svg' },
    { name: 'Williams', base: 'Grove, Reino Unido', championships: 9, logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Williams_Grand_Prix_Engineering_logo.svg' },
  ];

  for (const team of teams) {
    await prisma.team.create({ data: team });
  }

  console.log('✅ Seed completado exitosamente: 2 usuarios y 10 escuderías creadas.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });