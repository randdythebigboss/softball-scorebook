export const PLAY_CATEGORIES = {
  HIT: 'hit',
  WALK: 'walk',
  OUT: 'out',
  ERROR: 'error',
  SACRIFICE: 'sacrifice',
  OTHER: 'other',
};

// countsAsAB: whether this play records an official at-bat
// countsAsHit: whether a base hit is recorded
// outCount: how many outs this play records (0, 1, 2 for DP, 3 for TP)
// bases: how many bases the batter advances (0 = stays at plate / out, 4 = HR scores)
//
// Excel compatibility notes:
//   H4 is an alias for HR used in some Dominican scorebooks.
//   HP maps to HBP (hit by pitch) — same behavior, different label.
//   Codes like 4-3 / 6-3 must NEVER be entered as free text in the UI; Excel
//   silently converts them to serial numbers (46118, 46082 etc). Always use
//   controlled buttons so the code stays as the string "GO43", "GO63", etc.
export const PLAY_CODES = {

  // ── Hits ─────────────────────────────────────────────────────────────────────
  H1: { code: 'H1', label: '1B', description: 'Sencillo',         category: PLAY_CATEGORIES.HIT,       bases: 1, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  H2: { code: 'H2', label: '2B', description: 'Doble',            category: PLAY_CATEGORIES.HIT,       bases: 2, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  H3: { code: 'H3', label: '3B', description: 'Triple',           category: PLAY_CATEGORIES.HIT,       bases: 3, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  HR: { code: 'HR', label: 'HR', description: 'Jonrón',           category: PLAY_CATEGORIES.HIT,       bases: 4, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  // H4 = HR alias used in Excel-style Dominican scorebooks
  H4: { code: 'H4', label: 'H4', description: 'Jonrón (H4)',      category: PLAY_CATEGORIES.HIT,       bases: 4, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },

  // ── Walks / On Base ────────────────────────────────────────────────────────
  BB:  { code: 'BB',  label: 'BB',  description: 'Base por Bolas',    category: PLAY_CATEGORIES.WALK,  bases: 1, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },
  IBB: { code: 'IBB', label: 'IBB', description: 'Base Intencional',  category: PLAY_CATEGORIES.WALK,  bases: 1, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },
  HP:  { code: 'HP',  label: 'HBP', description: 'Golpeado por Lanzamiento', category: PLAY_CATEGORIES.WALK, bases: 1, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },

  // Fielder's Choice: AB counts; batter reaches 1B; runner put out is manual
  FC: { code: 'FC', label: 'FC', description: 'Jugada de Selección', category: PLAY_CATEGORIES.OTHER, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },

  // ── Strikeouts ─────────────────────────────────────────────────────────────
  K:  { code: 'K',  label: 'K',   description: 'Ponche (swing)',    category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  KL: { code: 'KL', label: 'K L', description: 'Ponche (llamado)', category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },

  // ── Fly Outs (all 9 fielding positions) ───────────────────────────────────
  F1: { code: 'F1', label: 'F1', description: 'Elevado – Pitcher', category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F2: { code: 'F2', label: 'F2', description: 'Elevado – Cátcher', category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F3: { code: 'F3', label: 'F3', description: 'Elevado – 1B',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F4: { code: 'F4', label: 'F4', description: 'Elevado – 2B',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F5: { code: 'F5', label: 'F5', description: 'Elevado – 3B',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F6: { code: 'F6', label: 'F6', description: 'Elevado – SS',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F7: { code: 'F7', label: 'F7', description: 'Elevado – LF',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F8: { code: 'F8', label: 'F8', description: 'Elevado – CF',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F9: { code: 'F9', label: 'F9', description: 'Elevado – RF',      category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },

  // ── Ground Outs (throw sequence) ──────────────────────────────────────────
  // IMPORTANT: Never enter these as free text — Excel converts 4-3, 6-3, etc.
  // to serial numbers. Always use button controls.
  GO13: { code: 'GO13', label: '1-3',  description: 'Rola – Pitcher a 1B',   category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO14: { code: 'GO14', label: '1-4',  description: 'Rola – Pitcher a 2B',   category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO16: { code: 'GO16', label: '1-6',  description: 'Rola – Pitcher a SS',   category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO23: { code: 'GO23', label: '2-3',  description: 'Rola – Cátcher a 1B',  category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO3U: { code: 'GO3U', label: '3U',   description: 'Rola – 1B sin asistencia', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO31: { code: 'GO31', label: '3-1',  description: 'Rola – 1B a Pitcher',   category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO34: { code: 'GO34', label: '3-4',  description: 'Rola – 1B a 2B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO41: { code: 'GO41', label: '4-1',  description: 'Rola – 2B a Pitcher',   category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO43: { code: 'GO43', label: '4-3',  description: 'Rola – 2B a 1B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO46: { code: 'GO46', label: '4-6',  description: 'Rola – 2B a SS',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO52: { code: 'GO52', label: '5-2',  description: 'Rola – 3B a Cátcher',  category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO53: { code: 'GO53', label: '5-3',  description: 'Rola – 3B a 1B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO54: { code: 'GO54', label: '5-4',  description: 'Rola – 3B a 2B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO63: { code: 'GO63', label: '6-3',  description: 'Rola – SS a 1B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO64: { code: 'GO64', label: '6-4',  description: 'Rola – SS a 2B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO65: { code: 'GO65', label: '6-5',  description: 'Rola – SS a 3B',        category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },

  // ── Double / Triple Plays ─────────────────────────────────────────────────
  DP: { code: 'DP', label: 'DP', description: 'Doble Play',    category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 2 },
  TP: { code: 'TP', label: 'TP', description: 'Triple Play',   category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 3 },

  // ── Generic Out (Excel "O" notation) ─────────────────────────────────────
  O: { code: 'O', label: 'O', description: 'Out (genérico)', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },

  // ── Errors ────────────────────────────────────────────────────────────────
  // Batter reaches; counts as AB but NOT a hit; error charged to defensive team
  E1: { code: 'E1', label: 'E1', description: 'Error – Pitcher', category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E2: { code: 'E2', label: 'E2', description: 'Error – Cátcher',category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E3: { code: 'E3', label: 'E3', description: 'Error – 1B',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E4: { code: 'E4', label: 'E4', description: 'Error – 2B',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E5: { code: 'E5', label: 'E5', description: 'Error – 3B',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E6: { code: 'E6', label: 'E6', description: 'Error – SS',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E7: { code: 'E7', label: 'E7', description: 'Error – LF',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E8: { code: 'E8', label: 'E8', description: 'Error – CF',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E9: { code: 'E9', label: 'E9', description: 'Error – RF',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },

  // ── Sacrifices ────────────────────────────────────────────────────────────
  // No AB recorded; runner advancement tracked manually via +1 Carrera button
  SF:  { code: 'SF',  label: 'SF',  description: 'Fly de Sacrificio', category: PLAY_CATEGORIES.SACRIFICE, bases: 0, isOut: true, countsAsAB: false, countsAsHit: false, outCount: 1 },
  SAC: { code: 'SAC', label: 'SAC', description: 'Toque de Sacrificio', category: PLAY_CATEGORIES.SACRIFICE, bases: 0, isOut: true, countsAsAB: false, countsAsHit: false, outCount: 1 },

  // ── Other ─────────────────────────────────────────────────────────────────
  OTHER: { code: 'OTHER', label: 'Otro', description: 'Otro (anotar detalle)', category: PLAY_CATEGORIES.OTHER, bases: 0, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },
};

// ── Button groups for the Score Game UI ──────────────────────────────────────
// Six tabs: Hits | On Base | K/Fly | Ground Out | Errores | Especial
// Ordered by frequency of use in Dominican informal softball (Excel reference)
export const SCORING_BUTTONS = [
  {
    group: 'Hits',
    plays: ['H1', 'H2', 'H3', 'HR'],
  },
  {
    group: 'On Base',
    plays: ['BB', 'IBB', 'HP', 'FC'],
  },
  {
    group: 'K / Fly',
    plays: ['K', 'KL', 'F7', 'F8', 'F9', 'F3', 'F4', 'F5', 'F6', 'F1', 'F2'],
  },
  {
    group: 'Rola',
    plays: ['GO43', 'GO63', 'GO53', 'GO13', 'GO64', 'GO46', 'GO14', 'GO16', 'GO23', 'GO3U', 'GO31', 'GO34', 'GO41', 'GO52', 'GO54', 'GO65', 'DP', 'TP'],
  },
  {
    group: 'Errores',
    plays: ['E6', 'E5', 'E4', 'E3', 'E7', 'E8', 'E9', 'E1', 'E2'],
  },
  {
    group: 'Especial',
    plays: ['SF', 'SAC', 'O', 'OTHER'],
  },
];

export const POSITIONS = [
  { code: 'P',  label: 'P',  name: 'Pitcher'             },
  { code: 'C',  label: 'C',  name: 'Cátcher'             },
  { code: '1B', label: '1B', name: 'Primera Base'         },
  { code: '2B', label: '2B', name: 'Segunda Base'         },
  { code: '3B', label: '3B', name: 'Tercera Base'         },
  { code: 'SS', label: 'SS', name: 'Torpedero'            },
  { code: 'LF', label: 'LF', name: 'Jardín Izquierdo'    },
  { code: 'CF', label: 'CF', name: 'Jardín Central'      },
  { code: 'RF', label: 'RF', name: 'Jardín Derecho'      },
  { code: 'DH', label: 'DH', name: 'Bateador Designado'  },
  { code: 'EH', label: 'EH', name: 'Bateador Extra'      },
  { code: 'UT', label: 'UT', name: 'Utilidad'            },
];
