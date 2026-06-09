// Mock data for Centro Verón Scorebook prototype
// Rosters and game data inspired by "Hoja Apunte Centro Veron VS Seibo.xlsx"
// Centro Verón players use real names from the workbook.
// Triple A players use real names from the workbook.
// TODO: Replace with real API/database calls in future version.

export const MOCK_TEAMS = [
  {
    id: 'team-veron',
    name: 'Centro Verón',
    shortName: 'VER',
    city: 'Punta Cana / Verón',
    color: '#166534',
    accentColor: '#fbbf24',
    isMainTeam: true,
    stats: { gamesPlayed: 14, wins: 10, losses: 4, runsScored: 92, runsAllowed: 58 },
  },
  {
    id: 'team-triplea',
    name: 'Triple A',
    shortName: 'AAA',
    city: 'La Romana',
    color: '#1e3a5f',
    accentColor: '#e53e3e',
    isMainTeam: false,
    stats: { gamesPlayed: 13, wins: 5, losses: 8, runsScored: 61, runsAllowed: 85 },
  },
  {
    id: 'team-titanes',
    name: 'Los Titanes',
    shortName: 'TIT',
    city: 'Santo Domingo',
    color: '#1a2744',
    accentColor: '#f97316',
    isMainTeam: false,
    stats: { gamesPlayed: 12, wins: 8, losses: 4, runsScored: 87, runsAllowed: 62 },
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
];

export const MOCK_PLAYERS = [

  // ── Centro Verón ────────────────────────────────────────────────────────────
  // Real roster from the Excel workbook.
  // Stars listed first so GameSummary demo performers show the leaders.

  // Lineup leaders / stars (from Excel game summary)
  { id: 'vp11', teamId: 'team-veron', number: 11, firstName: 'Abismael',   lastName: 'Reyes',                  nickname: 'Abis',    position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 45, hits: 15, doubles: 3, triples: 0, hr: 5,  rbi: 18, runs: 11, bb: 3,  k: 7  } },
  { id: 'vp15', teamId: 'team-veron', number: 15, firstName: 'Heiry',      lastName: 'Ruiz De La Cruz',         nickname: 'Heiry',   position: 'CF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 40, hits: 14, doubles: 2, triples: 0, hr: 8,  rbi: 22, runs: 14, bb: 2,  k: 6  } },
  { id: 'vp22', teamId: 'team-veron', number: 22, firstName: 'Joan',       lastName: 'Bolívar Flores De La Cruz',nickname: 'Joan',    position: 'RF', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 40, hits: 16, doubles: 3, triples: 1, hr: 3,  rbi: 12, runs: 10, bb: 2,  k: 5  } },

  // Excel lineup order (remaining starters)
  { id: 'vp29', teamId: 'team-veron', number: 29, firstName: 'Sebastián',  lastName: 'Paredes',                 nickname: 'Sebas',   position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 44, hits: 10, doubles: 1, triples: 0, hr: 2,  rbi: 8,  runs: 8,  bb: 4,  k: 10 } },
  { id: 'vp6',  teamId: 'team-veron', number: 6,  firstName: 'Andres',     lastName: 'Del Rosario Polanco',     nickname: 'Andresito',position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 42, hits: 11, doubles: 2, triples: 0, hr: 0,  rbi: 6,  runs: 8,  bb: 5,  k: 7  } },
  { id: 'vp8',  teamId: 'team-veron', number: 8,  firstName: 'Daniel',     lastName: 'Guadalupe De La Cruz Rijo',nickname: 'DanielG', position: 'CF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 44, hits: 11, doubles: 3, triples: 1, hr: 1,  rbi: 6,  runs: 9,  bb: 3,  k: 9  } },
  { id: 'vp3',  teamId: 'team-veron', number: 3,  firstName: 'Raulin',     lastName: 'Berroa Reyes',            nickname: 'Raulin',  position: '1B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 44, hits: 12, doubles: 2, triples: 0, hr: 2,  rbi: 10, runs: 7,  bb: 4,  k: 8  } },
  { id: 'vp9',  teamId: 'team-veron', number: 9,  firstName: 'Junior',     lastName: 'Abel De La Cruz Martínez',nickname: 'Junior',  position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 38, hits: 9,  doubles: 1, triples: 1, hr: 1,  rbi: 5,  runs: 6,  bb: 3,  k: 9  } },
  { id: 'vp4',  teamId: 'team-veron', number: 4,  firstName: 'Cristopher', lastName: 'De La Cruz Batista',      nickname: 'Cris',    position: '2B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 14, ab: 45, hits: 12, doubles: 2, triples: 0, hr: 3,  rbi: 11, runs: 9,  bb: 3,  k: 10 } },
  { id: 'vp26', teamId: 'team-veron', number: 26, firstName: 'Adony',      lastName: 'Manuel Severino',         nickname: 'Adony',   position: 'LF', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 13, ab: 38, hits: 9,  doubles: 1, triples: 0, hr: 1,  rbi: 4,  runs: 5,  bb: 2,  k: 8  } },
  { id: 'vp30', teamId: 'team-veron', number: 30, firstName: 'Carlito',    lastName: 'Feliz',                   nickname: 'Carlito', position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 16, hits: 4,  doubles: 0, triples: 0, hr: 0,  rbi: 2,  runs: 2,  bb: 1,  k: 5  } },

  // Full roster (additional players)
  { id: 'vp1',  teamId: 'team-veron', number: 1,  firstName: 'Jonathan',   lastName: 'Sierra',                  nickname: 'John',    position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 18, hits: 4,  doubles: 1, triples: 0, hr: 0,  rbi: 2,  runs: 3,  bb: 1,  k: 6  } },
  { id: 'vp2',  teamId: 'team-veron', number: 2,  firstName: 'Denny',      lastName: 'Javier De La Cruz',       nickname: 'Denny',   position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 38, hits: 10, doubles: 2, triples: 0, hr: 0,  rbi: 5,  runs: 6,  bb: 3,  k: 7  } },
  { id: 'vp5',  teamId: 'team-veron', number: 5,  firstName: 'Yohandri',   lastName: 'Moisés De La Cruz',       nickname: 'Yohandri',position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 34, hits: 8,  doubles: 1, triples: 0, hr: 1,  rbi: 4,  runs: 4,  bb: 2,  k: 8  } },
  { id: 'vp7',  teamId: 'team-veron', number: 7,  firstName: 'Henderson',  lastName: 'Ruiz De La Cruz',         nickname: 'Hender',  position: 'LF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 38, hits: 10, doubles: 2, triples: 1, hr: 1,  rbi: 5,  runs: 7,  bb: 3,  k: 7  } },
  { id: 'vp10', teamId: 'team-veron', number: 10, firstName: 'David',      lastName: 'De La Cruz Batista',      nickname: 'David',   position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 24, hits: 6,  doubles: 1, triples: 0, hr: 0,  rbi: 3,  runs: 3,  bb: 2,  k: 5  } },
  { id: 'vp12', teamId: 'team-veron', number: 12, firstName: 'Joel',       lastName: 'González',                nickname: 'Joel',    position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 6,  ab: 10, hits: 3,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 2,  bb: 1,  k: 2  } },
  { id: 'vp13', teamId: 'team-veron', number: 13, firstName: 'Yoandry',    lastName: 'Rijo Martínez',           nickname: 'Yoandry', position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 20, hits: 5,  doubles: 1, triples: 0, hr: 0,  rbi: 2,  runs: 3,  bb: 2,  k: 4  } },
  { id: 'vp14', teamId: 'team-veron', number: 14, firstName: 'Francisco',  lastName: 'Ramírez',                 nickname: 'Yei',     position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 22, hits: 5,  doubles: 1, triples: 0, hr: 1,  rbi: 4,  runs: 3,  bb: 2,  k: 5  } },
  { id: 'vp16', teamId: 'team-veron', number: 16, firstName: 'José',       lastName: 'Abel Batista Jiménez',    nickname: 'Pepe',    position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 14, hits: 3,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 2,  bb: 1,  k: 3  } },
  { id: 'vp17', teamId: 'team-veron', number: 17, firstName: 'Randy',      lastName: 'De La Cruz Del Rosario',  nickname: 'Randy',   position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 18, hits: 4,  doubles: 1, triples: 0, hr: 0,  rbi: 2,  runs: 2,  bb: 1,  k: 4  } },
  { id: 'vp18', teamId: 'team-veron', number: 18, firstName: 'Yadrelis',   lastName: 'Sebastian Paredes',       nickname: 'Yadrelis',position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 6,  ab: 12, hits: 3,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 2,  bb: 1,  k: 2  } },
  { id: 'vp19', teamId: 'team-veron', number: 19, firstName: 'Leuri',      lastName: 'Ramírez Mercedes',        nickname: 'Leuri',   position: 'UT', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 5,  ab: 10, hits: 2,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 1,  bb: 0,  k: 2  } },
  { id: 'vp20', teamId: 'team-veron', number: 20, firstName: 'Frenyery',   lastName: 'Santiago Aponte',         nickname: 'Frenyery',position: 'UT', bats: 'R', throws: 'R', active: false, stats: { gamesPlayed: 4,  ab: 8,  hits: 1,  doubles: 0, triples: 0, hr: 0,  rbi: 0,  runs: 1,  bb: 1,  k: 2  } },
  { id: 'vp21', teamId: 'team-veron', number: 21, firstName: 'Jahiro',     lastName: 'De La Cruz Romero',       nickname: 'Jahiro',  position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 5,  ab: 10, hits: 2,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 1,  bb: 0,  k: 2  } },
  { id: 'vp23', teamId: 'team-veron', number: 23, firstName: 'Carlos',     lastName: 'Abdiel Berroa',           nickname: 'Carlos',  position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 6,  ab: 12, hits: 3,  doubles: 1, triples: 0, hr: 0,  rbi: 2,  runs: 2,  bb: 1,  k: 2  } },
  { id: 'vp24', teamId: 'team-veron', number: 24, firstName: 'José',       lastName: 'Jordany Polanco Vásquez', nickname: 'Jordany', position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 5,  ab: 10, hits: 2,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 1,  bb: 1,  k: 2  } },
  { id: 'vp25', teamId: 'team-veron', number: 25, firstName: 'Adalberto',  lastName: 'Fabián',                  nickname: 'Berto',   position: 'UT', bats: 'R', throws: 'R', active: false, stats: { gamesPlayed: 3,  ab: 6,  hits: 1,  doubles: 0, triples: 0, hr: 0,  rbi: 0,  runs: 0,  bb: 1,  k: 2  } },
  { id: 'vp27', teamId: 'team-veron', number: 27, firstName: 'Carlo',      lastName: 'Feliz Olea',              nickname: 'Carlo',   position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 15, hits: 3,  doubles: 0, triples: 0, hr: 0,  rbi: 1,  runs: 2,  bb: 1,  k: 5  } },
  { id: 'vp28', teamId: 'team-veron', number: 28, firstName: 'Jhoyce',     lastName: 'Su Casella',              nickname: 'Jhoyce',  position: 'UT', bats: 'R', throws: 'R', active: false, stats: { gamesPlayed: 3,  ab: 5,  hits: 1,  doubles: 0, triples: 0, hr: 0,  rbi: 0,  runs: 1,  bb: 0,  k: 1  } },

  // ── Triple A ─────────────────────────────────────────────────────────────
  // Real players from the Excel workbook.
  // Daniel Fanith listed first — Excel game leader in H, HR, and AVG.

  { id: 'ap2',  teamId: 'team-triplea', number: 24, firstName: 'Daniel',   lastName: 'Fanith',             nickname: 'Fanith',   position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 42, hits: 16, doubles: 3, triples: 0, hr: 6,  rbi: 22, runs: 13, bb: 3,  k: 5  } },
  { id: 'ap7',  teamId: 'team-triplea', number: 18, firstName: 'Wander',   lastName: 'Levis',              nickname: 'Wander',   position: '1B', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 13, ab: 40, hits: 12, doubles: 3, triples: 0, hr: 2,  rbi: 9,  runs: 7,  bb: 3,  k: 7  } },
  { id: 'ap1',  teamId: 'team-triplea', number: 3,  firstName: 'Roderic',  lastName: 'Rodríguez',          nickname: 'Roderic',  position: 'CF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 40, hits: 10, doubles: 2, triples: 1, hr: 0,  rbi: 4,  runs: 7,  bb: 3,  k: 8  } },
  // Three players named Starlin — distinguished by position and last name
  { id: 'ap3',  teamId: 'team-triplea', number: 7,  firstName: 'Starlin',  lastName: 'De La Rosa',         nickname: 'Starlin',  position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 37, hits: 11, doubles: 2, triples: 0, hr: 1,  rbi: 7,  runs: 6,  bb: 2,  k: 8  } },
  { id: 'ap4',  teamId: 'team-triplea', number: 15, firstName: 'Starlin',  lastName: 'Suero',              nickname: 'Starlin',  position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 34, hits: 8,  doubles: 1, triples: 0, hr: 0,  rbi: 3,  runs: 6,  bb: 3,  k: 9  } },
  { id: 'ap6',  teamId: 'team-triplea', number: 6,  firstName: 'Starlin',  lastName: 'Hernandez',          nickname: 'Starlin H',position: '2B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 36, hits: 10, doubles: 2, triples: 0, hr: 0,  rbi: 4,  runs: 5,  bb: 3,  k: 8  } },
  { id: 'ap5',  teamId: 'team-triplea', number: 11, firstName: 'Yilver',   lastName: 'Peralta',            nickname: 'Yilver',   position: 'LF', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 13, ab: 39, hits: 11, doubles: 3, triples: 0, hr: 1,  rbi: 5,  runs: 6,  bb: 2,  k: 7  } },
  { id: 'ap8',  teamId: 'team-triplea', number: 2,  firstName: 'Randol',   lastName: 'Vilorio',            nickname: 'Randol',   position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 32, hits: 8,  doubles: 1, triples: 0, hr: 0,  rbi: 3,  runs: 3,  bb: 4,  k: 9  } },
  { id: 'ap9',  teamId: 'team-triplea', number: 9,  firstName: 'Victor',   lastName: 'Rosario',            nickname: 'Victor',   position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 30, hits: 8,  doubles: 1, triples: 0, hr: 1,  rbi: 5,  runs: 4,  bb: 2,  k: 8  } },
  { id: 'ap10', teamId: 'team-triplea', number: 21, firstName: 'Juan',     lastName: 'Manzanillo',         nickname: 'Manzanillo',position: 'EH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 22, hits: 6,  doubles: 1, triples: 0, hr: 0,  rbi: 2,  runs: 3,  bb: 2,  k: 6  } },
  { id: 'ap11', teamId: 'team-triplea', number: 17, firstName: 'Lervy',    lastName: 'Jiménez',            nickname: 'Lervy',    position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 13, ab: 38, hits: 10, doubles: 2, triples: 0, hr: 1,  rbi: 5,  runs: 6,  bb: 3,  k: 8  } },
  { id: 'ap12', teamId: 'team-triplea', number: 1,  firstName: 'Payan',    lastName: 'Peralta',            nickname: 'Payan',    position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 18, hits: 4,  doubles: 0, triples: 0, hr: 0,  rbi: 2,  runs: 2,  bb: 1,  k: 5  } },
  { id: 'ap13', teamId: 'team-triplea', number: 4,  firstName: 'Papolo',   lastName: 'Báez',               nickname: 'Papolo',   position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 17, hits: 4,  doubles: 1, triples: 0, hr: 0,  rbi: 2,  runs: 2,  bb: 1,  k: 4  } },

  // ── Los Titanes ──────────────────────────────────────────────────────────
  { id: 'p1',  teamId: 'team-titanes', number: 3,  firstName: 'Ramón',    lastName: 'Pérez',     nickname: 'Monchi',    position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 44, hits: 16, doubles: 3, triples: 1, hr: 2, rbi: 9,  runs: 11, bb: 5, k: 6  } },
  { id: 'p2',  teamId: 'team-titanes', number: 7,  firstName: 'Carlos',   lastName: 'Marte',     nickname: 'Caliche',   position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 46, hits: 18, doubles: 4, triples: 0, hr: 3, rbi: 14, runs: 10, bb: 3, k: 8  } },
  { id: 'p3',  teamId: 'team-titanes', number: 12, firstName: 'José',     lastName: 'Reyes',     nickname: 'Cheo',      position: '2B', bats: 'S', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 40, hits: 14, doubles: 2, triples: 1, hr: 0, rbi: 6,  runs: 9,  bb: 7, k: 5  } },
  { id: 'p4',  teamId: 'team-titanes', number: 25, firstName: 'Miguel',   lastName: 'Santos',    nickname: 'Miguelito', position: '1B', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 12, ab: 42, hits: 15, doubles: 5, triples: 0, hr: 4, rbi: 16, runs: 8,  bb: 4, k: 10 } },
  { id: 'p5',  teamId: 'team-titanes', number: 18, firstName: 'Freddy',   lastName: 'Montero',   nickname: 'Fredy',     position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 34, hits: 10, doubles: 1, triples: 0, hr: 1, rbi: 5,  runs: 4,  bb: 3, k: 9  } },
  { id: 'p6',  teamId: 'team-titanes', number: 9,  firstName: 'Pedro',    lastName: 'Guzmán',    nickname: 'Pedrito',   position: 'CF', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 48, hits: 17, doubles: 2, triples: 3, hr: 1, rbi: 7,  runs: 15, bb: 6, k: 7  } },
  { id: 'p7',  teamId: 'team-titanes', number: 15, firstName: 'Rafael',   lastName: 'Díaz',      nickname: 'Rafa',      position: 'LF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 11, ab: 38, hits: 12, doubles: 2, triples: 0, hr: 2, rbi: 8,  runs: 7,  bb: 2, k: 11 } },
  { id: 'p8',  teamId: 'team-titanes', number: 22, firstName: 'Ernesto',  lastName: 'Féliz',     nickname: 'Neto',      position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 41, hits: 13, doubles: 3, triples: 1, hr: 1, rbi: 6,  runs: 8,  bb: 4, k: 8  } },
  { id: 'p9',  teamId: 'team-titanes', number: 1,  firstName: 'Víctor',   lastName: 'Castillo',  nickname: 'Vicky',     position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 20, hits: 5,  doubles: 1, triples: 0, hr: 0, rbi: 2,  runs: 3,  bb: 2, k: 6  } },
  { id: 'p10', teamId: 'team-titanes', number: 44, firstName: 'Luis',     lastName: 'Rodríguez', nickname: 'Luisito',   position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 12, ab: 43, hits: 16, doubles: 4, triples: 0, hr: 5, rbi: 18, runs: 9,  bb: 5, k: 9  } },
  { id: 'p11', teamId: 'team-titanes', number: 33, firstName: 'Jesús',    lastName: 'Polanco',   nickname: 'Chucho',    position: 'EH', bats: 'L', throws: 'L', active: false, stats: { gamesPlayed: 4,  ab: 12, hits: 3,  doubles: 0, triples: 0, hr: 0, rbi: 1,  runs: 2,  bb: 1, k: 3  } },
  { id: 'p19', teamId: 'team-titanes', number: 45, firstName: 'Julio',    lastName: 'Cabrera',   nickname: 'Julio',     position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 18, hits: 4,  doubles: 1, triples: 0, hr: 0, rbi: 2,  runs: 2,  bb: 1, k: 5  } },
  { id: 'p20', teamId: 'team-titanes', number: 11, firstName: 'Daniel',   lastName: 'Medina',    nickname: 'Dani',      position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 26, hits: 7,  doubles: 1, triples: 0, hr: 1, rbi: 4,  runs: 3,  bb: 2, k: 6  } },

  // ── Seibo ─────────────────────────────────────────────────────────────────
  { id: 'p15', teamId: 'team-seibo',   number: 10, firstName: 'Manuel',   lastName: 'Guerrero',  nickname: 'Manny',     position: '3B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 36, hits: 11, doubles: 2, triples: 0, hr: 1, rbi: 6,  runs: 5,  bb: 2, k: 8  } },
  { id: 'p16', teamId: 'team-seibo',   number: 8,  firstName: 'Antonio',  lastName: 'Beltre',    nickname: 'Tony',      position: 'CF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 38, hits: 14, doubles: 3, triples: 1, hr: 2, rbi: 9,  runs: 8,  bb: 3, k: 5  } },
  { id: 'p30', teamId: 'team-seibo',   number: 3,  firstName: 'Cristian', lastName: 'López',     nickname: 'Cris',      position: 'P',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 20, hits: 4,  doubles: 0, triples: 0, hr: 0, rbi: 1,  runs: 2,  bb: 1, k: 8  } },
  { id: 'p31', teamId: 'team-seibo',   number: 17, firstName: 'Julio',    lastName: 'Reyes',     nickname: 'Julio',     position: 'C',  bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 9,  ab: 28, hits: 7,  doubles: 1, triples: 0, hr: 0, rbi: 3,  runs: 3,  bb: 2, k: 7  } },
  { id: 'p32', teamId: 'team-seibo',   number: 21, firstName: 'Ángel',    lastName: 'Rosario',   nickname: 'Ange',      position: 'SS', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 35, hits: 10, doubles: 2, triples: 1, hr: 0, rbi: 4,  runs: 7,  bb: 3, k: 8  } },
  { id: 'p33', teamId: 'team-seibo',   number: 6,  firstName: 'Damián',   lastName: 'Pichardo',  nickname: 'Damián',    position: '1B', bats: 'L', throws: 'L', active: true,  stats: { gamesPlayed: 9,  ab: 32, hits: 9,  doubles: 3, triples: 0, hr: 1, rbi: 6,  runs: 4,  bb: 3, k: 9  } },
  { id: 'p34', teamId: 'team-seibo',   number: 19, firstName: 'Darwin',   lastName: 'Sánchez',   nickname: 'Darwin',    position: '2B', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 37, hits: 10, doubles: 2, triples: 0, hr: 0, rbi: 3,  runs: 6,  bb: 4, k: 7  } },
  { id: 'p35', teamId: 'team-seibo',   number: 14, firstName: 'Franklin', lastName: 'Espinal',   nickname: 'Frank',     position: 'LF', bats: 'L', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 36, hits: 11, doubles: 2, triples: 1, hr: 1, rbi: 5,  runs: 7,  bb: 2, k: 6  } },
  { id: 'p36', teamId: 'team-seibo',   number: 27, firstName: 'César',    lastName: 'Montes',    nickname: 'Ceso',      position: 'RF', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 8,  ab: 27, hits: 7,  doubles: 1, triples: 0, hr: 1, rbi: 4,  runs: 3,  bb: 1, k: 8  } },
  { id: 'p37', teamId: 'team-seibo',   number: 9,  firstName: 'Jonathan', lastName: 'Cuello',    nickname: 'Jhony',     position: 'DH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 10, ab: 38, hits: 12, doubles: 2, triples: 0, hr: 2, rbi: 8,  runs: 5,  bb: 3, k: 9  } },
  { id: 'p38', teamId: 'team-seibo',   number: 33, firstName: 'Roberto',  lastName: 'Mejía',     nickname: 'Beto',      position: 'EH', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 7,  ab: 22, hits: 6,  doubles: 1, triples: 0, hr: 0, rbi: 3,  runs: 3,  bb: 2, k: 5  } },
  { id: 'p39', teamId: 'team-seibo',   number: 44, firstName: 'Omar',     lastName: 'Abreu',     nickname: 'Omar',      position: 'UT', bats: 'R', throws: 'R', active: true,  stats: { gamesPlayed: 6,  ab: 18, hits: 4,  doubles: 0, triples: 0, hr: 0, rbi: 1,  runs: 2,  bb: 1, k: 4  } },
];

// ── Completed Games ──────────────────────────────────────────────────────────
// game-004 is the Excel-inspired game: Centro Verón 7 – Triple A 0
// Listed first so MOCK_GAMES[0] (used by GameSummary demo) shows the Excel result.

export const MOCK_GAMES = [
  {
    id: 'game-004',
    date: '2026-06-07',
    location: 'Estadio Verón',
    homeTeamId: 'team-veron',
    awayTeamId: 'team-triplea',
    type: 'Liga',
    totalInnings: 7,
    status: 'final',
    homeScore: 7,
    awayScore: 0,
    lineScore: {
      home: [0, 2, 0, 2, 0, 3, 0],
      away: [0, 0, 0, 0, 0, 0, 0],
    },
    totals: {
      home: { runs: 7, hits: 6, errors: 0 },
      away: { runs: 0, hits: 7, errors: 0 },
    },
    playerGameStats: {},
    playEvents: [],
    finishedAt: '2026-06-07T21:30:00.000Z',
  },
  {
    id: 'game-001',
    date: '2026-06-01',
    location: 'Estadio Juan Marichal',
    homeTeamId: 'team-titanes',
    awayTeamId: 'team-veron',
    type: 'Liga',
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
    type: 'Liga',
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
    type: 'Liga',
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

// ── Demo current game (shown in Score Game when localStorage is empty) ────────
// Mirrors the Excel scenario: Centro Verón (home) vs Triple A (away)
export const MOCK_CURRENT_GAME = {
  id: 'game-current',
  date: '2026-06-09',
  location: 'Estadio Verón',
  homeTeamId: 'team-veron',
  awayTeamId: 'team-triplea',
  type: 'Liga',
  totalInnings: 7,
  status: 'in_progress',
  currentInning: 3,
  isTopInning: false,
  outs: 1,
  bases: [false, true, false],
  homeScore: 3,
  awayScore: 0,
  homeLineupIndex: 3,
  awayLineupIndex: 2,
  lineScore: {
    home: [0, 3, null, null, null, null, null],
    away: [0, 0, null, null, null, null, null],
  },
  totals: {
    home: { runs: 3, hits: 4, errors: 0 },
    away: { runs: 0, hits: 2, errors: 1 },
  },
  playerGameStats: {},
  playEvents: [],
  history: [],
  createdAt: '2026-06-09T18:00:00.000Z',
  updatedAt: '2026-06-09T18:30:00.000Z',
  finishedAt: null,
};

// ── Demo lineups (used as fallback in Score Game when no lineup is configured) ─

// Excel lineup — Centro Verón (home)
export const MOCK_HOME_LINEUP = [
  { order: 1,  playerId: 'vp29', position: 'SS' },
  { order: 2,  playerId: 'vp6',  position: 'C'  },
  { order: 3,  playerId: 'vp11', position: '3B' },
  { order: 4,  playerId: 'vp15', position: 'CF' },
  { order: 5,  playerId: 'vp8',  position: '1B' },
  { order: 6,  playerId: 'vp3',  position: 'DH' },
  { order: 7,  playerId: 'vp9',  position: 'EH' },
  { order: 8,  playerId: 'vp22', position: 'RF' },
  { order: 9,  playerId: 'vp4',  position: '2B' },
  { order: 10, playerId: 'vp26', position: 'LF' },
  { order: 11, playerId: 'vp30', position: 'P'  },
];

// Triple A (away) — 9-player lineup
export const MOCK_AWAY_LINEUP = [
  { order: 1, playerId: 'ap1',  position: 'CF' },
  { order: 2, playerId: 'ap2',  position: 'DH' },
  { order: 3, playerId: 'ap3',  position: '3B' },
  { order: 4, playerId: 'ap4',  position: 'SS' },
  { order: 5, playerId: 'ap5',  position: 'LF' },
  { order: 6, playerId: 'ap6',  position: '2B' },
  { order: 7, playerId: 'ap7',  position: '1B' },
  { order: 8, playerId: 'ap8',  position: 'C'  },
  { order: 9, playerId: 'ap11', position: 'RF' },
];

// ── Sample play events (displayed in Score Game demo panel) ──────────────────
export const MOCK_PLAY_EVENTS = [
  { id: 'ev1', gameId: 'game-current', inning: 1, isTop: true,  playerId: 'ap1',  code: 'GO43', description: 'Rola – 2B a 1B',  outs: 1, runsScored: 0 },
  { id: 'ev2', gameId: 'game-current', inning: 1, isTop: true,  playerId: 'ap2',  code: 'BB',   description: 'Base por Bolas',  outs: 1, runsScored: 0 },
  { id: 'ev3', gameId: 'game-current', inning: 1, isTop: true,  playerId: 'ap3',  code: 'K',    description: 'Ponche',          outs: 2, runsScored: 0 },
  { id: 'ev4', gameId: 'game-current', inning: 2, isTop: false, playerId: 'vp11', code: 'HR',   description: 'Jonrón 2R',       outs: 0, runsScored: 2 },
  { id: 'ev5', gameId: 'game-current', inning: 2, isTop: false, playerId: 'vp15', code: 'HR',   description: 'Jonrón Solo',     outs: 0, runsScored: 1 },
  { id: 'ev6', gameId: 'game-current', inning: 2, isTop: false, playerId: 'vp8',  code: 'GO63', description: 'Rola – SS a 1B',  outs: 1, runsScored: 0 },
];

// ── Aggregated season stats (used as fallback before real games are completed) ─
export const MOCK_PLAYER_STATS = MOCK_PLAYERS.map(p => ({
  playerId: p.id,
  ...p.stats,
  avg: p.stats.ab > 0 ? (p.stats.hits / p.stats.ab) : 0,
  obp: p.stats.ab > 0 ? ((p.stats.hits + p.stats.bb) / (p.stats.ab + p.stats.bb)) : 0,
  slg: p.stats.ab > 0 ? ((p.stats.hits + p.stats.doubles + p.stats.triples * 2 + p.stats.hr * 3) / p.stats.ab) : 0,
}));
