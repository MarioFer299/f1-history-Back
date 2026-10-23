import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  await prisma.suscripcion.deleteMany();
  await prisma.escuderia.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('Password123!', 10);
  
  await prisma.user.createMany({
    data: [
      {
        nombre: 'Admin F1',
        email: 'admin@f1history.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
      {
        nombre: 'Usuario Prueba',
        email: 'user@f1history.com',
        password: hashedPassword,
        role: 'USER',
      },
    ],
  });

  const escuderias = [
    { nombre: 'McLaren Formula 1 Team', puntos2025: 833, fundacion: 1963, base: 'Woking, Reino Unido', campeonatos: 9, color: '#FF8700', categoria: 'top,historicas', imagenLogo: 'mclaren' },
    { nombre: 'Mercedes-AMG PETRONAS', puntos2025: 469, fundacion: 2010, base: 'Brackley, Reino Unido', campeonatos: 8, color: '#00D2BE', categoria: 'top,historicas', imagenLogo: 'mercedes' },
    { nombre: 'Oracle Red Bull Racing', puntos2025: 451, fundacion: 2005, base: 'Milton Keynes, Reino Unido', campeonatos: 6, color: '#0600EF', categoria: 'top', imagenLogo: 'redbull' },
    { nombre: 'Scuderia Ferrari HP', puntos2025: 398, fundacion: 1950, base: 'Maranello, Italia', campeonatos: 16, color: '#DC0000', categoria: 'top,historicas', imagenLogo: 'ferrari' },
    { nombre: 'Williams Racing', puntos2025: 137, fundacion: 1977, base: 'Grove, Reino Unido', campeonatos: 9, color: '#005AFF', categoria: 'historicas', imagenLogo: 'williams' },
    { nombre: 'Visa Cash App RB', puntos2025: 92, fundacion: 2006, base: 'Faenza, Italia', campeonatos: 0, color: '#6692FF', categoria: '', imagenLogo: 'racing-bulls' },
    { nombre: 'Aston Martin Aramco', puntos2025: 89, fundacion: 2021, base: 'Silverstone, Reino Unido', campeonatos: 0, color: '#006F62', categoria: '', imagenLogo: 'aston-martin' },
    { nombre: 'MoneyGram Haas F1 Team', puntos2025: 79, fundacion: 2016, base: 'Kannapolis, Estados Unidos', campeonatos: 0, color: '#B6BABD', categoria: '', imagenLogo: 'haas' },
    { nombre: 'Stake F1 Team Kick Sauber', puntos2025: 70, fundacion: 1993, base: 'Hinwil, Suiza', campeonatos: 0, color: '#52E252', categoria: 'historicas', imagenLogo: 'sauber' },
    { nombre: 'Alpine F1 Team', puntos2025: 22, fundacion: 2021, base: 'Enstone, Reino Unido', campeonatos: 2, color: '#0090FF', categoria: 'historicas', imagenLogo: 'alpine' },
  ];

  for (const escuderia of escuderias) {
    await prisma.escuderia.create({ data: escuderia });
  }

  console.log('✅ Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });