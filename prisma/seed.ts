import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed con datos EXACTOS del repositorio original...');

  await prisma.suscripcion.deleteMany();
  await prisma.piloto.deleteMany();
  await prisma.escuderia.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('Password123!', 10);
  await prisma.user.createMany({
    data: [
      { nombre: 'Admin F1', email: 'admin@f1history.com', password: hashedPassword, role: 'ADMIN' },
      { nombre: 'Usuario Prueba', email: 'user@f1history.com', password: hashedPassword, role: 'USER' },
    ],
  });

  const datosF1 = [
    {
      nombre: 'McLaren Formula 1 Team', puntos2025: 833, fundacion: 1963, base: 'Woking, Reino Unido', campeonatos: 9, color: '#FF8700', categoria: 'top,historicas', imagenLogo: 'mclaren',
      historia: 'McLaren fue fundada en 1963 por el piloto neozelandés Bruce McLaren. Debutó oficialmente en F1 en 1966, logrando su primera victoria ese mismo año en Bélgica. Durante los 70, Emerson Fittipaldi consiguió el primer título de pilotos y constructores. La época dorada llegó con Alain Prost y Ayrton Senna a finales de los 80 y principios de los 90, dominando con motores Honda. Tras títulos con Mika Häkkinen (1998, 1999) y Lewis Hamilton (2008), el equipo pasó por una etapa de dificultades en los 2010. Sin embargo, con la llegada de Lando Norris y Oscar Piastri, McLaren ha recuperado su competitividad, logrando victorias y luchando nuevamente por el Campeonato de Constructores.',
      pilotos: [
        { nombre: 'Lando Norris', numero: 4, nacionalidad: 'Británico', fechaNacimiento: '13 de noviembre de 1999', lugarNacimiento: 'Bristol, Reino Unido', biografia: 'Lando Norris es uno de los pilotos más prometedores de su generación. Conocido por su carisma y habilidad bajo presión, ha demostrado ser un piloto completo capaz de luchar por victorias.', carreras: 118, victorias: 4, podios: 22, poles: 6, vueltasRapidas: 8, puntos: 834, logros: 'Campeón de la F1 en 2025 con McLaren. Considerado uno de los mejores pilotos jóvenes de la década.' },
        { nombre: 'Oscar Piastri', numero: 81, nacionalidad: 'Australiano', fechaNacimiento: '6 de abril de 2001', lugarNacimiento: 'Melbourne, Australia', biografia: 'Oscar Piastri llegó a la F1 tras ganar los campeonatos de F3 y F2 de manera consecutiva. Su adaptación a la categoría reina ha sido excepcional.', carreras: 42, victorias: 2, podios: 9, poles: 0, vueltasRapidas: 3, puntos: 292, logros: 'Subcampeón de la F1 en 2025. Rookie del Año 2023.' }
      ]
    },
    {
      nombre: 'Mercedes-AMG PETRONAS', puntos2025: 469, fundacion: 2010, base: 'Brackley, Reino Unido', campeonatos: 8, color: '#00D2BE', categoria: 'top,historicas', imagenLogo: 'mercedes',
      historia: 'Mercedes debutó como constructor en 1954, dominando con Juan Manuel Fangio. Tras retirarse en 1955, regresó en 2010 comprando Brawn GP. La era moderna de dominio comenzó en 2014 con la regulación de motores híbridos, logrando 8 campeonatos consecutivos de constructores y 6 de pilotos con Lewis Hamilton y Nico Rosberg. Es reconocido por su excelencia en ingeniería y estrategia.',
      pilotos: [
        { nombre: 'George Russell', numero: 63, nacionalidad: 'Británico', fechaNacimiento: '15 de febrero de 1998', lugarNacimiento: 'King\'s Lynn, Reino Unido', biografia: 'George Russell demostró su talento en Williams antes de unirse a Mercedes. Conocido por su consistencia y velocidad pura.', carreras: 108, victorias: 2, podios: 12, poles: 3, vueltasRapidas: 7, puntos: 567, logros: 'Victoria en GP de Brasil 2022. Primer piloto de Williams en conseguir pole desde 2018.' },
        { nombre: 'Andrea Kimi Antonelli', numero: 12, nacionalidad: 'Italiano', fechaNacimiento: '25 de agosto de 2006', lugarNacimiento: 'Bolonia, Italia', biografia: 'El joven prodigio italiano llegó a la F1 directamente desde la F2, siendo considerado uno de los talentos más prometedores de los últimos años.', carreras: 3, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 8, logros: 'Rookie de la temporada 2025. Campeón de F2 en 2024.' }
      ]
    },
    {
      nombre: 'Oracle Red Bull Racing', puntos2025: 451, fundacion: 2005, base: 'Milton Keynes, Reino Unido', campeonatos: 6, color: '#0600EF', categoria: 'top', imagenLogo: 'redbull',
      historia: 'Red Bull Racing fue fundada en 2005 tras la compra de Jaguar Racing. Bajo la dirección de Christian Horner y Adrian Newey, el equipo dominó la F1 entre 2010 y 2013 con Sebastian Vettel. Tras un periodo de transición, regresó a la cima en 2021 con Max Verstappen, logrando múltiples campeonatos consecutivos gracias a su innovación aerodinámica y eficiencia operativa.',
      pilotos: [
        { nombre: 'Max Verstappen', numero: 1, nacionalidad: 'Neerlandés', fechaNacimiento: '30 de septiembre de 1997', lugarNacimiento: 'Hasselt, Bélgica', biografia: 'Max Verstappen es uno de los pilotos más dominantes de la historia de la F1. Campeón mundial en 2021, 2022, 2023 y 2024.', carreras: 198, victorias: 62, podios: 107, poles: 40, vueltasRapidas: 33, puntos: 2841, logros: '4 veces Campeón Mundial. Piloto más joven en ganar un GP (18 años).' },
        { nombre: 'Yuki Tsunoda', numero: 22, nacionalidad: 'Japonés', fechaNacimiento: '11 de julio de 2000', lugarNacimiento: 'Saitama, Japón', biografia: 'Yuki Tsunoda es un piloto japonés que ha mostrado gran potencial en F1, destacando por su habilidad en circuitos cerrados.', carreras: 36, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 72, logros: 'Primer piloto japonés en F1 desde 2021. Puntos en su debut.' }
      ]
    },
    {
      nombre: 'Scuderia Ferrari HP', puntos2025: 398, fundacion: 1950, base: 'Maranello, Italia', campeonatos: 16, color: '#DC0000', categoria: 'top,historicas', imagenLogo: 'ferrari',
      historia: 'Scuderia Ferrari fue fundada por Enzo Ferrari en 1929. Es la única escudería que ha participado en todas las temporadas del Campeonato Mundial de Fórmula 1 desde 1950. Ganó sus primeros títulos con Alberto Ascari en 1952 y 1953. La era de Michael Schumacher (2000-2004) trajo 5 títulos consecutivos. Tras años de lucha con pilotos como Fernando Alonso y Sebastian Vettel, la llegada de Charles Leclerc y, históricamente, Lewis Hamilton en 2025, marca una nueva era para el equipo más laureado de la F1 con 16 títulos de constructores.',
      pilotos: [
        { nombre: 'Charles Leclerc', numero: 16, nacionalidad: 'Monegasco', fechaNacimiento: '16 de octubre de 1997', lugarNacimiento: 'Monte Carlo, Mónaco', biografia: 'Charles Leclerc es considerado uno de los pilotos más talentosos de su generación. Ha logrado múltiples victorias con Ferrari.', carreras: 138, victorias: 8, podios: 38, poles: 26, vueltasRapidas: 9, puntos: 1247, logros: 'Subcampeón Mundial 2022. Múltiples victorias con Ferrari.' },
        { nombre: 'Lewis Hamilton', numero: 44, nacionalidad: 'Británico', fechaNacimiento: '7 de enero de 1985', lugarNacimiento: 'Stevenage, Reino Unido', biografia: 'Lewis Hamilton es siete veces campeón del mundo y el piloto con más victorias en la historia de la F1. En 2025 dio el salto histórico a Ferrari.', carreras: 358, victorias: 105, podios: 201, poles: 105, vueltasRapidas: 67, puntos: 4847, logros: '7 veces Campeón Mundial. Máximo ganador de la historia de la F1.' }
      ]
    },
    {
      nombre: 'Williams Racing', puntos2025: 137, fundacion: 1977, base: 'Grove, Reino Unido', campeonatos: 9, color: '#005AFF', categoria: 'historicas', imagenLogo: 'williams',
      historia: 'Fundada por Frank Williams y Patrick Head, Williams debutó en 1977. Dominó los años 80 y 90 con pilotos como Nigel Mansell, Alain Prost, Ayrton Senna y Damon Hill, logrando 9 campeonatos de constructores. Tras un periodo de declive en la década de 2010, el equipo ha iniciado un proceso de reconstrucción, incorporando talento joven y experimentado como Alexander Albon y Carlos Sainz Jr. para regresar a la zona de puntos de forma consistente.',
      pilotos: [
        { nombre: 'Alexander Albon', numero: 23, nacionalidad: 'Tailandés', fechaNacimiento: '23 de marzo de 1996', lugarNacimiento: 'Londres, Reino Unido', biografia: 'Alexander Albon ha demostrado gran consistencia y habilidad. Su regreso a Williams en 2025 marcó un nuevo capítulo en su carrera.', carreras: 89, victorias: 0, podios: 2, poles: 0, vueltasRapidas: 1, puntos: 238, logros: 'Podios con Red Bull Racing. Rescate de Williams en 2022-2024.' },
        { nombre: 'Carlos Sainz Jr.', numero: 55, nacionalidad: 'Español', fechaNacimiento: '1 de septiembre de 1994', lugarNacimiento: 'Madrid, España', biografia: 'Carlos Sainz Jr. es conocido por su consistencia y habilidad en condiciones difíciles. En 2025 se unió a Williams buscando un nuevo desafío.', carreras: 198, victorias: 4, podios: 24, poles: 6, vueltasRapidas: 5, puntos: 1247, logros: 'Victoria en GP de Singapur 2022. Múltiples podios con Ferrari.' }
      ]
    },
    {
      nombre: 'Visa Cash App RB', puntos2025: 92, fundacion: 2006, base: 'Faenza, Italia', campeonatos: 0, color: '#6692FF', categoria: '', imagenLogo: 'racing-bulls',
      historia: 'Conocida originalmente como Minardi y luego Toro Rosso, esta escudería italiana ha sido el campo de entrenamiento oficial de Red Bull Racing. Ha lanzado las carreras de pilotos como Sebastian Vettel, Max Verstappen y Daniel Ricciardo. Bajo su identidad actual como Racing Bulls, busca consolidarse como un equipo de mitad de parrilla capaz de dar sorpresas y desarrollar talento joven.',
      pilotos: [
        { nombre: 'Isack Hadjar', numero: 6, nacionalidad: 'Francés', fechaNacimiento: '28 de septiembre de 2004', lugarNacimiento: 'París, Francia', biografia: 'Joven talento francés que llegó a la F1 tras destacar en las categorías inferiores del automovilismo.', carreras: 3, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 2, logros: 'Rookie 2025. Tercer lugar en F2 2024.' },
        { nombre: 'Liam Lawson', numero: 30, nacionalidad: 'Neozelandés', fechaNacimiento: '11 de febrero de 2002', lugarNacimiento: 'Hastings, Nueva Zelanda', biografia: 'Liam Lawson llegó a la F1 tras años como piloto de reservas de Red Bull. Su oportunidad llegó en 2025.', carreras: 12, victorias: 0, podios: 1, poles: 0, vueltasRapidas: 1, puntos: 48, logros: 'Podio en GP de Singapur 2023. Subcampeón de Super Formula 2024.' }
      ]
    },
    {
      nombre: 'Aston Martin Aramco', puntos2025: 89, fundacion: 2021, base: 'Silverstone, Reino Unido', campeonatos: 0, color: '#006F62', categoria: '', imagenLogo: 'aston-martin',
      historia: 'Aston Martin regresó a la F1 en 2021, heredando la estructura del equipo Racing Point (y anteriormente Force India y Jordan). Con la inversión de Lawrence Stroll y la construcción de una nueva fábrica de última generación en Silverstone, el equipo tiene como objetivo a largo plazo luchar por el Campeonato Mundial, apoyado por la experiencia de Fernando Alonso.',
      pilotos: [
        { nombre: 'Fernando Alonso', numero: 14, nacionalidad: 'Español', fechaNacimiento: '29 de julio de 1981', lugarNacimiento: 'Oviedo, España', biografia: 'Fernando Alonso es dos veces campeón del mundo y uno de los pilotos más respetados de la parrilla. Su experiencia es invaluable.', carreras: 398, victorias: 32, podios: 106, poles: 22, vueltasRapidas: 26, puntos: 2357, logros: '2 veces Campeón Mundial (2005, 2006). 32 victorias en F1.' },
        { nombre: 'Lance Stroll', numero: 18, nacionalidad: 'Canadiense', fechaNacimiento: '29 de octubre de 1998', lugarNacimiento: 'Montreal, Canadá', biografia: 'Lance Stroll ha demostrado ser un piloto sólido y consistente, con varios podios en su carrera.', carreras: 158, victorias: 0, podios: 3, poles: 1, vueltasRapidas: 0, puntos: 287, logros: 'Podio en GP de Azerbaiyán 2021. Pole en GP de Turquía 2020.' }
      ]
    },
    {
      nombre: 'MoneyGram Haas F1 Team', puntos2025: 79, fundacion: 2016, base: 'Kannapolis, Estados Unidos', campeonatos: 0, color: '#B6BABD', categoria: '', imagenLogo: 'haas',
      historia: 'Haas es la primera escudería estadounidense en la F1 desde 1986. Fundada por Gene Haas, el equipo se distingue por su modelo de negocio eficiente, aprovechando la relación técnica con Ferrari para sus componentes. A pesar de ser un equipo pequeño, ha logrado puntuar regularmente y consolidarse en la parrilla.',
      pilotos: [
        { nombre: 'Esteban Ocon', numero: 31, nacionalidad: 'Francés', fechaNacimiento: '17 de septiembre de 1996', lugarNacimiento: 'Évreux, Francia', biografia: 'Esteban Ocon es campeón del mundo de GP3 y ha demostrado gran talento en la F1, logrando una victoria memorable.', carreras: 148, victorias: 1, podios: 3, poles: 0, vueltasRapidas: 1, puntos: 458, logros: 'Victoria en GP de Hungría 2021. Podios múltiples.' },
        { nombre: 'Oliver Bearman', numero: 87, nacionalidad: 'Británico', fechaNacimiento: '8 de mayo de 2005', lugarNacimiento: 'Chelmsford, Reino Unido', biografia: 'Oliver Bearman es uno de los rookies más prometedores de 2025, llegando tras destacar en las categorías inferiores.', carreras: 8, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 12, logros: 'Puntos en su debut con Ferrari 2024. Rookie 2025.' }
      ]
    },
    {
      nombre: 'Stake F1 Team Kick Sauber', puntos2025: 70, fundacion: 1993, base: 'Hinwil, Suiza', campeonatos: 0, color: '#52E252', categoria: 'historicas', imagenLogo: 'sauber',
      historia: 'Sauber debutó en 1993 y ha sido un pilar de la F1, sirviendo como equipo oficial de BMW en el pasado y como academia de pilotos de Alfa Romeo. Actualmente, opera bajo el nombre Stake F1 Team, preparándose para su transición oficial a ser el equipo de fábrica de Audi a partir de 2026.',
      pilotos: [
        { nombre: 'Nico Hülkenberg', numero: 27, nacionalidad: 'Alemán', fechaNacimiento: '19 de agosto de 1987', lugarNacimiento: 'Emmerich, Alemania', biografia: 'Nico Hülkenberg es conocido como uno de los pilotos más experimentados sin victoria, pero con gran consistencia.', carreras: 218, victorias: 0, podios: 0, poles: 1, vueltasRapidas: 2, puntos: 567, logros: 'Pole en GP de Brasil 2010. 24 horas de Le Mans ganador 2015.' },
        { nombre: 'Gabriel Bortoleto', numero: 5, nacionalidad: 'Brasileño', fechaNacimiento: '14 de octubre de 2004', lugarNacimiento: 'São Paulo, Brasil', biografia: 'Gabriel Bortoleto es campeón de F3 y llegó a la F1 como uno de los rookies más esperados de 2025.', carreras: 3, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 0, puntos: 0, logros: 'Campeón de F3 2023. Rookie 2025.' }
      ]
    },
    {
      nombre: 'Alpine F1 Team', puntos2025: 22, fundacion: 2021, base: 'Enstone, Reino Unido', campeonatos: 2, color: '#0090FF', categoria: 'historicas', imagenLogo: 'alpine',
      historia: 'Alpine es la continuación del legado de Benetton y Renault en la F1. La escudería ganó campeonatos con Michael Schumacher y Fernando Alonso en la era Benetton/Renault. Bajo la marca Alpine, busca recuperar esa gloria pasada, con una base en Enstone y motores fabricados en Viry-Châtillon, Francia.',
      pilotos: [
        { nombre: 'Pierre Gasly', numero: 10, nacionalidad: 'Francés', fechaNacimiento: '7 de febrero de 1996', lugarNacimiento: 'Ruan, Francia', biografia: 'Pierre Gasly ha demostrado gran talento y consistencia, logrando victorias y podios a lo largo de su carrera.', carreras: 148, victorias: 1, podios: 4, poles: 0, vueltasRapidas: 3, puntos: 412, logros: 'Victoria en GP de Italia 2020. Múltiples podios.' },
        { nombre: 'Franco Colapinto', numero: 43, nacionalidad: 'Argentino', fechaNacimiento: '27 de mayo de 2003', lugarNacimiento: 'Pilar, Argentina', biografia: 'Franco Colapinto es el primer piloto argentino en F1 en décadas. Llegó como reemplazo en 2024 y se ganó un asiento titular.', carreras: 12, victorias: 0, podios: 0, poles: 0, vueltasRapidas: 1, puntos: 27, logros: 'Primer argentino en F1 desde 1997. Puntos en su debut.' }
      ]
    }
  ];

  for (const esc of datosF1) {
    const { pilotos, ...escuderiaData } = esc;
    const nuevaEscuderia = await prisma.escuderia.create({ data: escuderiaData });
    
    for (const piloto of pilotos) {
      await prisma.piloto.create({
        data: {
          ...piloto,
          escuderiaId: nuevaEscuderia.id
        }
      });
    }
  }

  console.log('✅ Seed completado con datos EXACTOS del repositorio original.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });