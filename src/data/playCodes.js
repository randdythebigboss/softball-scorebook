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
export const PLAY_CODES = {
  // Hits – count as AB and H; runners advance same number of bases
  H1: { code: 'H1', label: '1B', description: 'Single',       category: PLAY_CATEGORIES.HIT,       bases: 1, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  H2: { code: 'H2', label: '2B', description: 'Double',       category: PLAY_CATEGORIES.HIT,       bases: 2, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  H3: { code: 'H3', label: '3B', description: 'Triple',       category: PLAY_CATEGORIES.HIT,       bases: 3, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },
  HR: { code: 'HR', label: 'HR', description: 'Home Run',     category: PLAY_CATEGORIES.HIT,       bases: 4, isOut: false, countsAsAB: true,  countsAsHit: true,  outCount: 0 },

  // Walks / On Base – do NOT count as AB
  BB:  { code: 'BB',  label: 'BB',  description: 'Base on Balls',    category: PLAY_CATEGORIES.WALK,  bases: 1, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },
  IBB: { code: 'IBB', label: 'IBB', description: 'Intentional Walk', category: PLAY_CATEGORIES.WALK,  bases: 1, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },
  HP:  { code: 'HP',  label: 'HBP', description: 'Hit by Pitch',     category: PLAY_CATEGORIES.WALK,  bases: 1, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },

  // Fielder's Choice – counts as AB, not a hit; batter reaches 1B; runner out is manual
  // Assumption: no automatic out is recorded on the runner — scorer can add out manually.
  FC: { code: 'FC', label: 'FC', description: "Fielder's Choice",    category: PLAY_CATEGORIES.OTHER, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },

  // Outs – Strikeouts
  K:  { code: 'K',  label: 'K',   description: 'Strikeout',         category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  KL: { code: 'KL', label: 'K L', description: 'Strikeout Looking', category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },

  // Outs – Fly Outs
  F7: { code: 'F7', label: 'F7', description: 'Fly Out – LF',       category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F8: { code: 'F8', label: 'F8', description: 'Fly Out – CF',       category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F9: { code: 'F9', label: 'F9', description: 'Fly Out – RF',       category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },
  F3: { code: 'F3', label: 'F3', description: 'Fly Out – 1B',       category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 1 },

  // Outs – Ground Outs
  GO13: { code: 'GO13', label: '1-3', description: 'Ground Out 1-3', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO43: { code: 'GO43', label: '4-3', description: 'Ground Out 4-3', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO53: { code: 'GO53', label: '5-3', description: 'Ground Out 5-3', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO63: { code: 'GO63', label: '6-3', description: 'Ground Out 6-3', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO64: { code: 'GO64', label: '6-4', description: 'Ground Out 6-4', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },
  GO46: { code: 'GO46', label: '4-6', description: 'Ground Out 4-6', category: PLAY_CATEGORIES.OUT, bases: 0, isOut: true, countsAsAB: true, countsAsHit: false, outCount: 1 },

  // Double/Triple Plays – record 2 or 3 outs respectively
  DP: { code: 'DP', label: 'DP', description: 'Double Play',         category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 2 },
  TP: { code: 'TP', label: 'TP', description: 'Triple Play',         category: PLAY_CATEGORIES.OUT,   bases: 0, isOut: true,  countsAsAB: true,  countsAsHit: false, outCount: 3 },

  // Errors – batter reaches base; counts as AB but NOT a hit; adds error to defensive team
  // Assumption: errors count as official AB per standard baseball rules.
  E1: { code: 'E1', label: 'E1', description: 'Error – Pitcher',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E2: { code: 'E2', label: 'E2', description: 'Error – Catcher',     category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E3: { code: 'E3', label: 'E3', description: 'Error – 1B',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E4: { code: 'E4', label: 'E4', description: 'Error – 2B',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E5: { code: 'E5', label: 'E5', description: 'Error – 3B',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E6: { code: 'E6', label: 'E6', description: 'Error – SS',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E7: { code: 'E7', label: 'E7', description: 'Error – LF',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E8: { code: 'E8', label: 'E8', description: 'Error – CF',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },
  E9: { code: 'E9', label: 'E9', description: 'Error – RF',          category: PLAY_CATEGORIES.ERROR, bases: 1, isOut: false, countsAsAB: true,  countsAsHit: false, outCount: 0 },

  // Sacrifices – no AB; SF: assume scorer manually adds run; SAC: runners don't auto-advance
  // Assumption: runner advancement on SAC/SF must be tracked manually via +1 Carrera button.
  SF:  { code: 'SF',  label: 'SF',  description: 'Sacrifice Fly',  category: PLAY_CATEGORIES.SACRIFICE, bases: 0, isOut: true, countsAsAB: false, countsAsHit: false, outCount: 1 },
  SAC: { code: 'SAC', label: 'SAC', description: 'Sacrifice Bunt', category: PLAY_CATEGORIES.SACRIFICE, bases: 0, isOut: true, countsAsAB: false, countsAsHit: false, outCount: 1 },

  // Other – catch-all; scorer adds detail manually
  OTHER: { code: 'OTHER', label: 'Otro', description: 'Other', category: PLAY_CATEGORIES.OTHER, bases: 0, isOut: false, countsAsAB: false, countsAsHit: false, outCount: 0 },
};

// Quick-access groups for the scoring UI buttons
export const SCORING_BUTTONS = [
  { group: 'Hits',     plays: ['H1','H2','H3','HR'] },
  { group: 'On Base',  plays: ['BB','IBB','HP','FC'] },
  { group: 'Outs',     plays: ['K','KL','F7','F8','F9','GO43','GO53','GO63','DP'] },
  { group: 'Errors',   plays: ['E3','E4','E5','E6','E7','E8','E9'] },
  { group: 'Special',  plays: ['SF','SAC','OTHER'] },
];

export const POSITIONS = [
  { code: 'P',  label: 'P',  name: 'Pitcher'       },
  { code: 'C',  label: 'C',  name: 'Catcher'       },
  { code: '1B', label: '1B', name: 'First Base'     },
  { code: '2B', label: '2B', name: 'Second Base'    },
  { code: '3B', label: '3B', name: 'Third Base'     },
  { code: 'SS', label: 'SS', name: 'Shortstop'      },
  { code: 'LF', label: 'LF', name: 'Left Field'     },
  { code: 'CF', label: 'CF', name: 'Center Field'   },
  { code: 'RF', label: 'RF', name: 'Right Field'    },
  { code: 'DH', label: 'DH', name: 'Designated Hitter' },
  { code: 'EH', label: 'EH', name: 'Extra Hitter'   },
  { code: 'UT', label: 'UT', name: 'Utility'        },
];
