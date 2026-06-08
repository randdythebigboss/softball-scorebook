// Mock data for Dugout Scorebook prototype
// TODO: Replace with real API/database calls in future version

export const MOCK_TEAMS = [
  {
    id: 'team-titanes',
    name: 'Los Titanes',
    shortName: 'TIT',
    city: 'Santo Domingo',
    color: '#1a2744',
    accentColor: '#f97316',
    isMainTeam: true,
    stats: { gamesPlayed: 12, wins: 8, losses: 4, runsScored: 87, runsAllowed: 62 },
  },
  {
    id: 'team-veron',
    name: 'Centro Verón',
    shortName: 'VER',
    city: 'Punta Cana',
    color: '#166534',
    accentColor: '#fbbf24',
    isMainTeam: false,
    stats: { gamesPlayed: 12, wins: 7, losses: 5, runsScored: 74, runsAllowed: 68 },
  },
  {
    id: 'team-seibo',
    name: 'Seibo',
    shortName: 'SEI',
    city: 'El Seibo',
    color: '#7c2d12',
    accentColor: '#f9a825',
    isMainTeam: false,
    stats: { gamesPlayed: 10, wins: 5, losses: 5, runsScored: 58, runsAllowed: 60 },
  },
  {
    id: 'team-triplea',
    name: 'Triple A',
    shortName: 'AAA',
    city: 'La Romana',
    color: '#1e3a5f',
    accentColor: '#e53e3e',
    isMainTeam: false,
    stats: { gamesPlayed: 11, wins: 4, losses: 7, runsScored: 52, runsAllowed: 74 },
  },
];

export const MOCK_PLAYERS = [
  // Los Titanes
  { id: 'p1',  teamId: 'team-titanes', number: 3,  firstName: 'Ramón',    lastName: 'Pérez',     nickname: 'Monchi',  position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 44, hits: 16, doubles: 3, triples: 1, hr: 2, rbi: 9,  runs: 11, bb: 5, k: 6  } },
  { id: 'p2',  teamId: 'team-titanes', number: 7,  firstName: 'Carlos',   lastName: 'Marte',     nickname: 'Caliche', position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 46, hits: 18, doubles: 4, triples: 0, hr: 3, rbi: 14, runs: 10, bb: 3, k: 8  } },
  { id: 'p3',  teamId: 'team-titanes', number: 12, firstName: 'José',     lastName: 'Reyes',     nickname: 'Cheo',    position: '2B', bats: 'S', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 40, hits: 14, doubles: 2, triples: 1, hr: 0, rbi: 6,  runs: 9,  bb: 7, k: 5  } },
  { id: 'p4',  teamId: 'team-titanes', number: 25, firstName: 'Miguel',   lastName: 'Santos',    nickname: 'Miguelito',position: '1B', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 12, ab: 42, hits: 15, doubles: 5, triples: 0, hr: 4, rbi: 16, runs: 8,  bb: 4, k: 10 } },
  { id: 'p5',  teamId: 'team-titanes', number: 18, firstName: 'Freddy',   lastName: 'Montero',   nickname: 'Fredy',   position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 34, hits: 10, doubles: 1, triples: 0, hr: 1, rbi: 5,  runs: 4,  bb: 3, k: 9  } },
  { id: 'p6',  teamId: 'team-titanes', number: 9,  firstName: 'Pedro',    lastName: 'Guzmán',    nickname: 'Pedrito', position: 'CF', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 48, hits: 17, doubles: 2, triples: 3, hr: 1, rbi: 7,  runs: 15, bb: 6, k: 7  } },
  { id: 'p7',  teamId: 'team-titanes', number: 15, firstName: 'Rafael',   lastName: 'Díaz',      nickname: 'Rafa',    position: 'LF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 38, hits: 12, doubles: 2, triples: 0, hr: 2, rbi: 8,  runs: 7,  bb: 2, k: 11 } },
  { id: 'p8',  teamId: 'team-titanes', number: 22, firstName: 'Ernesto',  lastName: 'Féliz',     nickname: 'Neto',    position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 41, hits: 13, doubles: 3, triples: 1, hr: 1, rbi: 6,  runs: 8,  bb: 4, k: 8  } },
  { id: 'p9',  teamId: 'team-titanes', number: 1,  firstName: 'Víctor',   lastName: 'Castillo',  nickname: 'Vicky',   position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 20, hits: 5,  doubles: 1, triples: 0, hr: 0, rbi: 2,  runs: 3,  bb: 2, k: 6  } },
  { id: 'p10', teamId: 'team-titanes', number: 44, firstName: 'Luis',     lastName: 'Rodríguez', nickname: 'Luisito', position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 43, hits: 16, doubles: 4, triples: 0, hr: 5, rbi: 18, runs: 9,  bb: 5, k: 9  } },
  { id: 'p11', teamId: 'team-titanes', number: 33, firstName: 'Jesús',    lastName: 'Polanco',   nickname: 'Chucho',  position: 'EH', bats: 'L', throws: 'L', active: false, stats: { gamesPlayed: 4,  ab: 12, hits: 3,  doubles: 0, triples: 0, hr: 0, rbi: 1,  runs: 2,  bb: 1, k: 3  } },

  // Centro Verón
  { id: 'p12', teamId: 'team-veron',   number: 5,  firstName: 'Andrés',   lastName: 'Mateo',     nickname: 'Andreíto',position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 46, hits: 17, doubles: 3, triples: 2, hr: 1, rbi: 8,  runs: 12, bb: 4, k: 7  } },
  { id: 'p13', teamId: 'team-veron',   number: 14, firstName: 'Domingo',  lastName: 'Mena',      nickname: 'Mingo',   position: '1B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 40, hits: 13, doubles: 2, triples: 0, hr: 2, rbi: 10, runs: 6,  bb: 3, k: 10 } },
  { id: 'p14', teamId: 'team-veron',   number: 28, firstName: 'Nelson',   lastName: 'Taveras',   nickname: 'Nelo',    position: 'CF', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 12, ab: 45, hits: 16, doubles: 4, triples: 1, hr: 0, rbi: 5,  runs: 13, bb: 7, k: 6  } },

  // Seibo
  { id: 'p15', teamId: 'team-seibo',   number: 10, firstName: 'Manuel',   lastName: 'Guerrero',  nickname: 'Manny',   position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 36, hits: 11, doubles: 2, triples: 0, hr: 1, rbi: 6,  runs: 5,  bb: 2, k: 8  } },
  { id: 'p16', teamId: 'team-seibo',   number: 8,  firstName: 'Antonio',  lastName: 'Beltre',    nickname: 'Tony',    position: 'CF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 38, hits: 14, doubles: 3, triples: 1, hr: 2, rbi: 9,  runs: 8,  bb: 3, k: 5  } },

  // Triple A
  { id: 'p17', teamId: 'team-triplea', number: 21, firstName: 'Kelvin',   lastName: 'Hernández', nickname: 'Kelvin',  position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 30, hits: 8,  doubles: 1, triples: 0, hr: 0, rbi: 3,  runs: 4,  bb: 2, k: 12 } },
  { id: 'p18', teamId: 'team-triplea', number: 6,  firstName: 'Wander',   lastName: 'Peguero',   nickname: 'Wandy',   position: '2B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 40, hits: 12, doubles: 2, triples: 0, hr: 1, rbi: 5,  runs: 6,  bb: 3, k: 9  } },

  // Los Titanes — additional players (rounds roster to 12 active)
  { id: 'p19', teamId: 'team-titanes', number: 45, firstName: 'Julio',    lastName: 'Cabrera',   nickname: 'Julio',   position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 18, hits: 4,  doubles: 1, triples: 0, hr: 0, rbi: 2,  runs: 2,  bb: 1, k: 5  } },
  { id: 'p20', teamId: 'team-titanes', number: 11, firstName: 'Daniel',   lastName: 'Medina',    nickname: 'Dani',    position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 26, hits: 7,  doubles: 1, triples: 0, hr: 1, rbi: 4,  runs: 3,  bb: 2, k: 6  } },

  // Centro Verón — additional players (rounds roster to 12 active)
  { id: 'p21', teamId: 'team-veron',   number: 2,  firstName: 'Ramiro',   lastName: 'Castro',    nickname: 'Rami',    position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 32, hits: 9,  doubles: 2, triples: 0, hr: 1, rbi: 5,  runs: 4,  bb: 3, k: 7  } },
  { id: 'p22', teamId: 'team-veron',   number: 8,  firstName: 'Pablo',    lastName: 'Arias',     nickname: 'Pablito', position: '2B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 38, hits: 11, doubles: 3, triples: 0, hr: 0, rbi: 4,  runs: 7,  bb: 4, k: 8  } },
  { id: 'p23', teamId: 'team-veron',   number: 17, firstName: 'Javier',   lastName: 'Corniel',   nickname: 'Javico',  position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 35, hits: 10, doubles: 2, triples: 1, hr: 1, rbi: 6,  runs: 5,  bb: 2, k: 9  } },
  { id: 'p24', teamId: 'team-veron',   number: 30, firstName: 'Danilo',   lastName: 'Ramos',     nickname: 'Dani',    position: 'LF', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 40, hits: 13, doubles: 2, triples: 1, hr: 0, rbi: 5,  runs: 8,  bb: 5, k: 6  } },
  { id: 'p25', teamId: 'team-veron',   number: 11, firstName: 'Marcos',   lastName: 'Tejada',    nickname: 'Marco',   position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 33, hits: 8,  doubles: 1, triples: 0, hr: 2, rbi: 7,  runs: 4,  bb: 2, k: 10 } },
  { id: 'p26', teamId: 'team-veron',   number: 7,  firstName: 'Héctor',   lastName: 'Fermín',    nickname: 'Hector',  position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 22, hits: 5,  doubles: 0, triples: 0, hr: 0, rbi: 2,  runs: 3,  bb: 2, k: 7  } },
  { id: 'p27', teamId: 'team-veron',   number: 22, firstName: 'Omar',     lastName: 'Báez',      nickname: 'Omar',    position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 42, hits: 14, doubles: 3, triples: 0, hr: 3, rbi: 11, runs: 7,  bb: 4, k: 8  } },
  { id: 'p28', teamId: 'team-veron',   number: 4,  firstName: 'Eddy',     lastName: 'Polanco',   nickname: 'Eddy',    position: 'EH', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 8,  ab: 25, hits: 7,  doubles: 1, triples: 0, hr: 1, rbi: 4,  runs: 5,  bb: 3, k: 5  } },
  { id: 'p29', teamId: 'team-veron',   number: 35, firstName: 'Félix',    lastName: 'Alcántara', nickname: 'Felito',  position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 20, hits: 5,  doubles: 1, triples: 0, hr: 0, rbi: 2,  runs: 3,  bb: 1, k: 6  } },

  // Seibo — additional players (rounds roster to 12 active)
  { id: 'p30', teamId: 'team-seibo',   number: 3,  firstName: 'Cristian', lastName: 'López',     nickname: 'Cris',    position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 20, hits: 4,  doubles: 0, triples: 0, hr: 0, rbi: 1,  runs: 2,  bb: 1, k: 8  } },
  { id: 'p31', teamId: 'team-seibo',   number: 17, firstName: 'Julio',    lastName: 'Reyes',     nickname: 'Julio',   position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 28, hits: 7,  doubles: 1, triples: 0, hr: 0, rbi: 3,  runs: 3,  bb: 2, k: 7  } },
  { id: 'p32', teamId: 'team-seibo',   number: 21, firstName: 'Ángel',    lastName: 'Rosario',   nickname: 'Ange',    position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 35, hits: 10, doubles: 2, triples: 1, hr: 0, rbi: 4,  runs: 7,  bb: 3, k: 8  } },
  { id: 'p33', teamId: 'team-seibo',   number: 6,  firstName: 'Damián',   lastName: 'Pichardo',  nickname: 'Damián',  position: '1B', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 9,  ab: 32, hits: 9,  doubles: 3, triples: 0, hr: 1, rbi: 6,  runs: 4,  bb: 3, k: 9  } },
  { id: 'p34', teamId: 'team-seibo',   number: 19, firstName: 'Darwin',   lastName: 'Sánchez',   nickname: 'Darwin',  position: '2B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 37, hits: 10, doubles: 2, triples: 0, hr: 0, rbi: 3,  runs: 6,  bb: 4, k: 7  } },
  { id: 'p35', teamId: 'team-seibo',   number: 14, firstName: 'Franklin', lastName: 'Espinal',   nickname: 'Frank',   position: 'LF', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 36, hits: 11, doubles: 2, triples: 1, hr: 1, rbi: 5,  runs: 7,  bb: 2, k: 6  } },
  { id: 'p36', teamId: 'team-seibo',   number: 27, firstName: 'César',    lastName: 'Montes',    nickname: 'Ceso',    position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 27, hits: 7,  doubles: 1, triples: 0, hr: 1, rbi: 4,  runs: 3,  bb: 1, k: 8  } },
  { id: 'p37', teamId: 'team-seibo',   number: 9,  firstName: 'Jonathan', lastName: 'Cuello',    nickname: 'Jhony',   position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 38, hits: 12, doubles: 2, triples: 0, hr: 2, rbi: 8,  runs: 5,  bb: 3, k: 9  } },
  { id: 'p38', teamId: 'team-seibo',   number: 33, firstName: 'Roberto',  lastName: 'Mejía',     nickname: 'Beto',    position: 'EH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 22, hits: 6,  doubles: 1, triples: 0, hr: 0, rbi: 3,  runs: 3,  bb: 2, k: 5  } },
  { id: 'p39', teamId: 'team-seibo',   number: 44, firstName: 'Omar',     lastName: 'Abreu',     nickname: 'Omar',    position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 6,  ab: 18, hits: 4,  doubles: 0, triples: 0, hr: 0, rbi: 1,  runs: 2,  bb: 1, k: 4  } },

  // Triple A — additional players (rounds roster to 12 active)
  { id: 'p40', teamId: 'team-triplea', number: 4,  firstName: 'Julio',    lastName: 'Gutiérrez', nickname: 'Julo',    position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 30, hits: 7,  doubles: 1, triples: 0, hr: 0, rbi: 3,  runs: 3,  bb: 2, k: 8  } },
  { id: 'p41', teamId: 'team-triplea', number: 12, firstName: 'Sandy',    lastName: 'Almonte',   nickname: 'Sandy',   position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 38, hits: 11, doubles: 2, triples: 0, hr: 0, rbi: 4,  runs: 7,  bb: 3, k: 8  } },
  { id: 'p42', teamId: 'team-triplea', number: 25, firstName: 'Víctor',   lastName: 'Rosario',   nickname: 'Vicky',   position: '1B', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 34, hits: 9,  doubles: 3, triples: 0, hr: 1, rbi: 6,  runs: 4,  bb: 3, k: 9  } },
  { id: 'p43', teamId: 'team-triplea', number: 7,  firstName: 'Luis',     lastName: 'Rosales',   nickname: 'Lucho',   position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 37, hits: 10, doubles: 2, triples: 1, hr: 1, rbi: 5,  runs: 5,  bb: 2, k: 10 } },
  { id: 'p44', teamId: 'team-triplea', number: 16, firstName: 'Jhonny',   lastName: 'Cabral',    nickname: 'Jhonny',  position: 'LF', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 10, ab: 35, hits: 9,  doubles: 2, triples: 0, hr: 0, rbi: 3,  runs: 5,  bb: 4, k: 7  } },
  { id: 'p45', teamId: 'team-triplea', number: 29, firstName: 'Eduardo',  lastName: 'Marte',     nickname: 'Eddy',    position: 'CF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 40, hits: 11, doubles: 2, triples: 2, hr: 0, rbi: 5,  runs: 9,  bb: 4, k: 6  } },
  { id: 'p46', teamId: 'team-triplea', number: 3,  firstName: 'José',     lastName: 'García',    nickname: 'Joselito',position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 30, hits: 8,  doubles: 1, triples: 0, hr: 1, rbi: 4,  runs: 4,  bb: 2, k: 9  } },
  { id: 'p47', teamId: 'team-triplea', number: 10, firstName: 'Mario',    lastName: 'Santos',    nickname: 'Mario',   position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 41, hits: 13, doubles: 2, triples: 0, hr: 2, rbi: 9,  runs: 6,  bb: 3, k: 8  } },
  { id: 'p48', teamId: 'team-triplea', number: 55, firstName: 'Carlos',   lastName: 'Polanco',   nickname: 'Carlito', position: 'EH', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 8,  ab: 25, hits: 7,  doubles: 1, triples: 0, hr: 1, rbi: 5,  runs: 3,  bb: 2, k: 6  } },
  { id: 'p49', teamId: 'team-triplea', number: 8,  firstName: 'Alexis',   lastName: 'Jáquez',    nickname: 'Lexi',    position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 20, hits: 5,  doubles: 1, triples: 0, hr: 0, rbi: 2,  runs: 2,  bb: 1, k: 5  } },
];

export const MOCK_GAMES = [
  {
    id: 'game-001',
    date: '2026-06-01',
    location: 'Estadio Juan Marichal',
    homeTeamId: 'team-titanes',
    awayTeamId: 'team-veron',
    type: 'League',
    totalInnings: 7,
    status: 'final',
    homeScore: 8,
    awayScore: 5,
    lineScore: {
      home: [1, 2, 0, 0, 3, 2, 0],
      away: [0, 1, 1, 2, 0, 1, 0],
    },
    totals: {
      home: { runs: 8, hits: 11, errors: 1 },
      away: { runs: 5, hits: 8,  errors: 2 },
    },
    playerGameStats: {},
    playEvents: [],
    finishedAt: '2026-06-01T22:30:00.000Z',
  },
  {
    id: 'game-002',
    date: '2026-05-25',
    location: 'Parque La Trinitaria',
    homeTeamId: 'team-seibo',
    awayTeamId: 'team-titanes',
    type: 'League',
    totalInnings: 7,
    status: 'final',
    homeScore: 4,
    awayScore: 9,
    lineScore: {
      home: [0, 1, 0, 2, 0, 0, 1],
      away: [2, 0, 3, 1, 2, 0, 1],
    },
    totals: {
      home: { runs: 4, hits: 7,  errors: 3 },
      away: { runs: 9, hits: 12, errors: 0 },
    },
    playerGameStats: {},
    playEvents: [],
    finishedAt: '2026-05-25T21:00:00.000Z',
  },
  {
    id: 'game-003',
    date: '2026-05-18',
    location: 'Estadio Juan Marichal',
    homeTeamId: 'team-titanes',
    awayTeamId: 'team-triplea',
    type: 'League',
    totalInnings: 7,
    status: 'final',
    homeScore: 11,
    awayScore: 3,
    lineScore: {
      home: [3, 0, 2, 1, 0, 4, 1],
      away: [0, 1, 1, 0, 0, 0, 1],
    },
    totals: {
      home: { runs: 11, hits: 14, errors: 0 },
      away: { runs: 3,  hits: 5,  errors: 4 },
    },
    playerGameStats: {},
    playEvents: [],
    finishedAt: '2026-05-18T21:45:00.000Z',
  },
];

export const MOCK_CURRENT_GAME = {
  id: 'game-current',
  date: '2026-06-08',
  location: 'Estadio Juan Marichal',
  homeTeamId: 'team-titanes',
  awayTeamId: 'team-veron',
  type: 'League',
  totalInnings: 7,
  status: 'in_progress',
  currentInning: 3,
  isTopInning: false,
  outs: 1,
  bases: [false, true, false], // [1B occupied=false, 2B occupied=true, 3B occupied=false]
  homeScore: 3,
  awayScore: 2,
  homeLineupIndex: 3,
  awayLineupIndex: 2,
  lineScore: {
    home: [1, 2, null, null, null, null, null],
    away: [0, 2, null, null, null, null, null],
  },
  totals: {
    home: { runs: 3, hits: 5, errors: 0 },
    away: { runs: 2, hits: 4, errors: 1 },
  },
  playerGameStats: {}, // populated by scoring engine during live play
  playEvents: [],      // populated by scoring engine; MOCK_PLAY_EVENTS used for demo display
  history: [],         // undo snapshots
  createdAt: '2026-06-08T18:00:00.000Z',
  updatedAt: '2026-06-08T18:30:00.000Z',
  finishedAt: null,
};

export const MOCK_HOME_LINEUP = [
  { order: 1, playerId: 'p6',  position: 'CF' },
  { order: 2, playerId: 'p3',  position: '2B' },
  { order: 3, playerId: 'p1',  position: 'SS' },
  { order: 4, playerId: 'p10', position: 'DH' },
  { order: 5, playerId: 'p2',  position: '3B' },
  { order: 6, playerId: 'p4',  position: '1B' },
  { order: 7, playerId: 'p8',  position: 'RF' },
  { order: 8, playerId: 'p7',  position: 'LF' },
  { order: 9, playerId: 'p5',  position: 'C'  },
];

export const MOCK_AWAY_LINEUP = [
  { order: 1, playerId: 'p14', position: 'CF' },
  { order: 2, playerId: 'p12', position: 'SS' },
  { order: 3, playerId: 'p13', position: '1B' },
];

export const MOCK_PLAY_EVENTS = [
  { id: 'ev1', gameId: 'game-current', inning: 1, isTop: true,  playerId: 'p14', code: 'BB',   description: 'Base on Balls',  outs: 0, runsScored: 0 },
  { id: 'ev2', gameId: 'game-current', inning: 1, isTop: true,  playerId: 'p12', code: 'GO43', description: 'Ground Out 4-3', outs: 1, runsScored: 0 },
  { id: 'ev3', gameId: 'game-current', inning: 1, isTop: true,  playerId: 'p13', code: 'K',    description: 'Strikeout',      outs: 2, runsScored: 0 },
  { id: 'ev4', gameId: 'game-current', inning: 1, isTop: false, playerId: 'p6',  code: 'H2',   description: 'Double',         outs: 0, runsScored: 0 },
  { id: 'ev5', gameId: 'game-current', inning: 1, isTop: false, playerId: 'p3',  code: 'H1',   description: 'Single – RBI',   outs: 0, runsScored: 1 },
  { id: 'ev6', gameId: 'game-current', inning: 2, isTop: false, playerId: 'p1',  code: 'HR',   description: 'Home Run 2R',    outs: 0, runsScored: 2 },
];

// Aggregated player stats for Stats page
export const MOCK_PLAYER_STATS = MOCK_PLAYERS.map(p => ({
  playerId: p.id,
  ...p.stats,
  avg: p.stats.ab > 0 ? (p.stats.hits / p.stats.ab) : 0,
  obp: p.stats.ab > 0 ? ((p.stats.hits + p.stats.bb) / (p.stats.ab + p.stats.bb)) : 0,
  slg: p.stats.ab > 0 ? ((p.stats.hits + p.stats.doubles + p.stats.triples * 2 + p.stats.hr * 3) / p.stats.ab) : 0,
}));
