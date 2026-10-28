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

  // 3. Crear las 10 escuderías (URLs completas y corregidas)
  const teamsData = [
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

  for (const team of teamsData) {
    await prisma.team.create({ data: team });
  }
  console.log('🏎️ 10 escuderías cargadas en el catálogo.');

  // 4. Crear una interacción de prueba
  const firstTeam = await prisma.team.findFirst();
  if (firstTeam) {
    await prisma.interaction.create({
      data: {
        userId: normalUser.id,
        teamId: firstTeam.id,
        message: '¡Me interesa recibir información sobre este equipo!',
        type: 'solicitud_info',
      },
    });
    console.log('📩 Interacción de prueba creada vinculando usuario y equipo.');
  }

  console.log('✅ Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });