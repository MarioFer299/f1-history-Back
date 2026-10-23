import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed limpio con datos completos de F1 2025...');

  // 1. Limpiar todo en orden inverso a las relaciones
  await prisma.suscripcion.deleteMany();
  await prisma.piloto.deleteMany();
  await prisma.escuderia.deleteMany();
  await prisma.user.deleteMany();

  // 2. Usuarios de prueba
  const hashedPassword = await bcrypt.hash('Password123!', 10);
  await prisma.user.createMany({
    data: [
      { nombre: 'Admin F1', email: 'admin@f1history.com', password: hashedPassword, role: 'ADMIN' },
      { nombre: 'Usuario Prueba', email: 'user@f1history.com', password: hashedPassword, role: 'USER' },
    ],
  });

  // 3. Datos completos de Escuderías y Pilotos (Temporada 2025)
  const datosF1 = [
    {
      nombre: 'McLaren Formula 1 Team', puntos2025: 833, fundacion: 1963, base: 'Woking, Reino Unido', campeonatos: 9, color: '#FF8700', categoria: 'top,historicas', imagenLogo: 'mclaren',
      historia: 'Fundada por Bruce McLaren en 1963, es la segunda escudería más exitosa en la historia de la F1. Tras años de sequía, ha resurgido como una potencia dominante en la era moderna.',
      pilotos: [
        { nombre: 'Lando Norris', numero: 4, nacionalidad: 'Británico', fechaNacimiento: '13/11/1999', lugarNacimiento: 'Bristol, Reino Unido', biografia: 'Uno de los pilotos más carismáticos y rápidos de su generación.', carreras: 118, victorias: 4, podios: 22, poles: 6, vueltasRapidas: 8, puntos: 834, logros: 'Campeón de la F1 en 2025 con McLaren.' },
        { nombre: 'Oscar Piastri', numero: 81, nacionalidad: 'Australiano', fechaNacimiento: '06/04/2001', lugarNacimiento: 'Melbourne, Australia', biografia: 'Campeón de F3 y F2 que llegó a la F1 con una adaptación excepcional.', carreras: 42, victorias: 2, podios: 9, poles: 0, vueltasRapidas: 3, puntos: 292, logros: 'Subcampeón de la F1 en 2025. Rookie del Año 2023.' }
      ]
    },
    {
      nombre: 'Mercedes-AMG PETRONAS', puntos2025: 469, fundacion: 2010, base: 'Brackley, Reino Unido', campeonatos: 8, color: '#00D2BE', categoria: 'top,historicas', imagenLogo: 'mercedes',
      historia: 'Dominó la era híbrida de la F1 con 8 campeonatos consecutivos de constructores, estableciendo récords históricos de la categoría.',
      pilotos: [
        { nombre: 'George Russell', numero: 63, nacionalidad: 'Británico', fechaNacimiento: '15/02/1998', lugarNacimiento: "King's Lynn, Reino Unido", biografia: 'Demostró su talento en Williams antes de unirse a Mercedes. Conocido por su consistencia.', carreras: 108, victorias: 2, podios: 12, poles: 3, vueltasRapidas: 7, puntos: 567, logros: 'Victoria en GP de Brasil 2022.' },
        { nombre: 'Andrea Kimi Antonelli', numero: 12, nacionalidad: 'Italiano', fechaNacimiento: '25/08/2006', lugarNacimiento: 'Bolonia, Italia', biografia: 'El joven prodigio italiano llegó a la F1 directamente desde la F2.', carreras: 3, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 8, logros: 'Rookie de la temporada 2025. Campeón de F2 en 2024.' }
      ]
    },
    {
      nombre: 'Oracle Red Bull Racing', puntos2025: 451, fundacion: 2005, base: 'Milton Keynes, Reino Unido', campeonatos: 6, color: '#0600EF', categoria: 'top', imagenLogo: 'redbull',
      historia: 'Conocida por su innovación aerodinámica y su dominio reciente, ha forjado una dinastía moderna en la categoría.',
      pilotos: [
        { nombre: 'Max Verstappen', numero: 1, nacionalidad: 'Neerlandés', fechaNacimiento: '30/09/1997', lugarNacimiento: 'Hasselt, Bélgica', biografia: 'Uno de los pilotos más dominantes de la historia. Campeón mundial en 2021, 2022, 2023 y 2024.', carreras: 198, victorias: 62, podios: 107, poles: 40, vueltasRapidas: 33, puntos: 2841, logros: '4 veces Campeón Mundial. Piloto más joven en ganar un GP.' },
        { nombre: 'Yuki Tsunoda', numero: 22, nacionalidad: 'Japonés', fechaNacimiento: '11/07/2000', lugarNacimiento: 'Saitama, Japón', biografia: 'Piloto japonés que ha mostrado gran potencial en F1, destacando en circuitos cerrados.', carreras: 36, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 72, logros: 'Primer piloto japonés en F1 desde 2021.' }
      ]
    },
    {
      nombre: 'Scuderia Ferrari HP', puntos2025: 398, fundacion: 1950, base: 'Maranello, Italia', campeonatos: 16, color: '#DC0000', categoria: 'top,historicas', imagenLogo: 'ferrari',
      historia: 'El equipo más antiguo y exitoso en la historia de la Fórmula 1, símbolo de pasión y tradición italiana.',
      pilotos: [
        { nombre: 'Charles Leclerc', numero: 16, nacionalidad: 'Monegasco', fechaNacimiento: '16/10/1997', lugarNacimiento: 'Monte Carlo, Mónaco', biografia: 'Considerado uno de los pilotos más talentosos de su generación. Ha logrado múltiples victorias con Ferrari.', carreras: 138, victorias: 8, podios: 38, poles: 26, vueltasRapidas: 9, puntos: 1247, logros: 'Subcampeón Mundial 2022. Múltiples victorias con Ferrari.' },
        { nombre: 'Lewis Hamilton', numero: 44, nacionalidad: 'Británico', fechaNacimiento: '07/01/1985', lugarNacimiento: 'Stevenage, Reino Unido', biografia: 'Siete veces campeón del mundo y el piloto con más victorias en la historia. En 2025 dio el salto histórico a Ferrari.', carreras: 358, victorias: 105, podios: 201, poles: 105, vueltasRapidas: 67, puntos: 4847, logros: '7 veces Campeón Mundial. Máximo ganador de la historia de la F1.' }
      ]
    },
    {
      nombre: 'Williams Racing', puntos2025: 137, fundacion: 1977, base: 'Grove, Reino Unido', campeonatos: 9, color: '#005AFF', categoria: 'historicas', imagenLogo: 'williams',
      historia: 'Una de las escuderías más laureadas de los años 80 y 90, actualmente en un proceso de reconstrucción y retorno a la competitividad.',
      pilotos: [
        { nombre: 'Alexander Albon', numero: 23, nacionalidad: 'Tailandés', fechaNacimiento: '23/03/1996', lugarNacimiento: 'Londres, Reino Unido', biografia: 'Ha demostrado gran consistencia y habilidad. Su regreso a Williams marcó un nuevo capítulo.', carreras: 89, victorias: 0, podios: 2, poles: 0, vueltasRapidas: 1, puntos: 238, logros: 'Podios con Red Bull Racing. Rescate de Williams en 2022-2024.' },
        { nombre: 'Carlos Sainz Jr.', numero: 55, nacionalidad: 'Español', fechaNacimiento: '01/09/1994', lugarNacimiento: 'Madrid, España', biografia: 'Conocido por su consistencia y habilidad en condiciones difíciles. En 2025 se unió a Williams.', carreras: 198, victorias: 4, podios: 24, poles: 6, vueltasRapidas: 5, puntos: 1247, logros: 'Victoria en GP de Singapur 2022. Múltiples podios con Ferrari.' }
      ]
    },
    {
      nombre: 'Visa Cash App RB', puntos2025: 92, fundacion: 2006, base: 'Faenza, Italia', campeonatos: 0, color: '#6692FF', categoria: '', imagenLogo: 'racing-bulls',
      historia: 'El equipo hermano de Red Bull, históricamente conocido como Toro Rosso, ha sido la cuna de grandes talentos.',
      pilotos: [
        { nombre: 'Isack Hadjar', numero: 6, nacionalidad: 'Francés', fechaNacimiento: '28/09/2004', lugarNacimiento: 'París, Francia', biografia: 'Joven talento francés que llegó a la F1 tras destacar en las categorías inferiores.', carreras: 3, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 2, logros: 'Rookie 2025. Tercer lugar en F2 2024.' },
        { nombre: 'Liam Lawson', numero: 30, nacionalidad: 'Neozelandés', fechaNacimiento: '11/02/2002', lugarNacimiento: 'Hastings, Nueva Zelanda', biografia: 'Llegó a la F1 tras años como piloto de reservas de Red Bull. Su oportunidad llegó en 2025.', carreras: 12, victorias: 0, podios: 1, poles: 0, vueltasRapidas: 1, puntos: 48, logros: 'Podio en GP de Singapur 2023. Subcampeón de Super Formula 2024.' }
      ]
    },
    {
      nombre: 'Aston Martin Aramco', puntos2025: 89, fundacion: 2021, base: 'Silverstone, Reino Unido', campeonatos: 0, color: '#006F62', categoria: '', imagenLogo: 'aston-martin',
      historia: 'La reencarnación moderna de equipos legendarios como Jordan y Force India, con ambiciones de campeonato.',
      pilotos: [
        { nombre: 'Fernando Alonso', numero: 14, nacionalidad: 'Español', fechaNacimiento: '29/07/1981', lugarNacimiento: 'Oviedo, España', biografia: 'Dos veces campeón del mundo y uno de los pilotos más respetados de la parrilla.', carreras: 398, victorias: 32, podios: 106, poles: 22, vueltasRapidas: 26, puntos: 2357, logros: '2 veces Campeón Mundial (2005, 2006). 32 victorias en F1.' },
        { nombre: 'Lance Stroll', numero: 18, nacionalidad: 'Canadiense', fechaNacimiento: '29/10/1998', lugarNacimiento: 'Montreal, Canadá', biografia: 'Ha demostrado ser un piloto sólido y consistente, con varios podios en su carrera.', carreras: 158, victorias: 0, podios: 3, poles: 1, vueltasRapidas: 0, puntos: 287, logros: 'Podio en GP de Azerbaiyán 2021. Pole en GP de Turquía 2020.' }
      ]
    },
    {
      nombre: 'MoneyGram Haas F1 Team', puntos2025: 79, fundacion: 2016, base: 'Kannapolis, Estados Unidos', campeonatos: 0, color: '#B6BABD', categoria: '', imagenLogo: 'haas',
      historia: 'El único equipo estadounidense en la parrilla actual, conocido por su modelo de negocio eficiente.',
      pilotos: [
        { nombre: 'Esteban Ocon', numero: 31, nacionalidad: 'Francés', fechaNacimiento: '17/09/1996', lugarNacimiento: 'Évreux, Francia', biografia: 'Campeón del mundo de GP3 que ha demostrado gran talento en la F1.', carreras: 148, victorias: 1, podios: 3, poles: 0, vueltasRapidas: 1, puntos: 458, logros: 'Victoria en GP de Hungría 2021.' },
        { nombre: 'Oliver Bearman', numero: 87, nacionalidad: 'Británico', fechaNacimiento: '08/05/2005', lugarNacimiento: 'Chelmsford, Reino Unido', biografia: 'Uno de los rookies más prometedores de 2025, llegando tras destacar en categorías inferiores.', carreras: 8, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 12, logros: 'Puntos en su debut con Ferrari 2024. Rookie 2025.' }
      ]
    },
    {
      nombre: 'Stake F1 Team Kick Sauber', puntos2025: 70, fundacion: 1993, base: 'Hinwil, Suiza', campeonatos: 0, color: '#52E252', categoria: 'historicas', imagenLogo: 'sauber',
      historia: 'Un pilar de la F1 desde los 90, que ha servido como puente para futuros equipos de fábrica.',
      pilotos: [
        { nombre: 'Nico Hülkenberg', numero: 27, nacionalidad: 'Alemán', fechaNacimiento: '19/08/1987', lugarNacimiento: 'Emmerich, Alemania', biografia: 'Conocido como uno de los pilotos más experimentados sin victoria, pero con gran consistencia.', carreras: 218, victorias: 0, podios: 0, poles: 1, vueltasRapidas: 2, puntos: 567, logros: 'Pole en GP de Brasil 2010. 24 horas de Le Mans ganador 2015.' },
        { nombre: 'Gabriel Bortoleto', numero: 5, nacionalidad: 'Brasileño', fechaNacimiento: '14/10/2004', lugarNacimiento: 'São Paulo, Brasil', biografia: 'Campeón de F3 que llegó a la F1 como uno de los rookies más esperados de 2025.', carreras: 3, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 0, logros: 'Campeón de F3 2023. Rookie 2025.' }
      ]
    },
    {
      nombre: 'Alpine F1 Team', puntos2025: 22, fundacion: 2021, base: 'Enstone, Reino Unido', campeonatos: 2, color: '#0090FF', categoria: 'historicas', imagenLogo: 'alpine',
      historia: 'La continuación del legado de Benetton y Renault, con una rica historia de campeonatos mundiales.',
      pilotos: [
        { nombre: 'Pierre Gasly', numero: 10, nacionalidad: 'Francés', fechaNacimiento: '07/02/1996', lugarNacimiento: 'Ruan, Francia', biografia: 'Ha demostrado gran talento y consistencia, logrando victorias y podios a lo largo de su carrera.', carreras: 148, victorias: 1, podios: 4, poles: 0, vueltasRapidas: 3, puntos: 412, logros: 'Victoria en GP de Italia 2020.' },
        { nombre: 'Franco Colapinto', numero: 43, nacionalidad: 'Argentino', fechaNacimiento: '27/05/2003', lugarNacimiento: 'Pilar, Argentina', biografia: 'Primer piloto argentino en F1 en décadas. Llegó como reemplazo en 2024 y se ganó un asiento titular.', carreras: 12, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 1, puntos: 27, logros: 'Primer argentino en F1 desde 1997. Puntos en su debut.' }
      ]
    }
  ];

  // 4. Insertar datos en la base de datos
  for (const esc of datosF1) {
    const { pilotos, ...escuderiaData } = esc;
    
    // Crear escudería
    const nuevaEscuderia = await prisma.escuderia.create({ data: escuderiaData });
    
    // Crear pilotos asociados a esta escudería
    for (const piloto of pilotos) {
      await prisma.piloto.create({
        data: {
          ...piloto,
          escuderiaId: nuevaEscuderia.id
        }
      });
    }
  }

  console.log('✅ Seed completado exitosamente: 10 escuderías, 20 pilotos con estadísticas y 2 usuarios.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });