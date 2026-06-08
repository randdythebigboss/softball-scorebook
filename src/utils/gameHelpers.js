import { PLAY_CODES, PLAY_CATEGORIES } from '../data/playCodes';

// ─── Player stat helpers ──────────────────────────────────────────────────────

function emptyPlayerStats() {
  return { ab: 0, hits: 0, doubles: 0, triples: 0, hr: 0, rbi: 0, runs: 0, bb: 0, k: 0 };
}

/** Build an empty playerGameStats map from both lineup arrays. */
export function initializePlayerGameStats(homeLineup, awayLineup) {
  const stats = {};
  [...(homeLineup || []), ...(awayLineup || [])].forEach(entry => {
    if (entry.playerId && !stats[entry.playerId]) {
      stats[entry.playerId] = emptyPlayerStats();
    }
  });
  return stats;
}

/**
 * Return updated stats object for one player after a play.
 * RBI assumption: we credit the batter with RBI equal to runsScored on hits/HR/SF.
 * Runs assumption: individual run scoring is not tracked per player in v1 (no runner ID tracking).
 */
function updatePlayerStatsForPlay(playerStats, play, runsScored) {
  const s = { ...playerStats };
  if (play.countsAsAB) s.ab += 1;
  if (play.countsAsHit) {
    s.hits += 1;
    if (play.code === 'H2') s.doubles += 1;
    if (play.code === 'H3') s.triples += 1;
    if (play.code === 'HR') { s.hr += 1; s.runs += 1; } // batter scores on HR
  }
  if (play.category === PLAY_CATEGORIES.WALK || play.code === 'HP') s.bb += 1;
  if (play.code === 'K' || play.code === 'KL') s.k += 1;
  // RBI: credited for runs driven in by hit, HR, or sacrifice fly
  if ((play.countsAsHit || play.code === 'SF') && runsScored > 0) s.rbi += runsScored;
  return s;
}

// ─── Base advancement ─────────────────────────────────────────────────────────

/**
 * Advance all base runners by `advance` bases.
 * Returns { newBases, runsScored }.
 * Simplified rule: every runner advances the same number of bases as the batter.
 */
function advanceBases(bases, advance) {
  if (advance === 0) return { newBases: [...bases], runsScored: 0 };

  const newBases = [false, false, false];
  let runsScored = 0;

  // Move existing runners from 3rd to 1st to avoid overwriting
  for (let i = 2; i >= 0; i--) {
    if (!bases[i]) continue;
    const dest = i + advance;
    if (dest >= 3) runsScored++;
    else newBases[dest] = true;
  }

  // Place batter
  if (advance >= 4) {
    runsScored++; // HR – batter scores
  } else {
    const batterDest = advance - 1;
    newBases[batterDest] = true;
  }

  return { newBases, runsScored };
}

// ─── Core scoring function ────────────────────────────────────────────────────

/**
 * Apply a play to the game state.
 * Returns a complete new game state with:
 *  - updated bases, outs, score, lineScore, totals
 *  - play event appended to playEvents
 *  - player stats updated
 *  - previous state pushed onto history (for undo)
 *  - batter index advanced
 *
 * @param {object} game   – current game state
 * @param {string} code   – play code (e.g. 'H1', 'K', 'HR')
 * @param {string} batterId – current batter's player id
 * @param {string[]} [homeLineup] – home lineup array (for batter advance)
 * @param {string[]} [awayLineup] – away lineup array
 */
export function applyPlayToGameState(game, code, batterId, homeLineup, awayLineup) {
  const play = PLAY_CODES[code];
  if (!play) return game;

  // Snapshot before this play (strip its own history to avoid recursive nesting)
  const snapshot = JSON.parse(JSON.stringify(game));
  delete snapshot.history;

  // Working copy with snapshot pushed onto history (keep last 10)
  let g = JSON.parse(JSON.stringify(game));
  g.history = [...(g.history || []).slice(-9), snapshot];

  const isTop = g.isTopInning;
  const inningIdx = g.currentInning - 1;

  // ── Outs ──────────────────────────────────────────────────────────────────
  const outsToAdd = play.outCount != null ? play.outCount : (play.isOut ? 1 : 0);
  g.outs = Math.min(g.outs + outsToAdd, 3);

  // ── Bases & runs ──────────────────────────────────────────────────────────
  let runsScored = 0;
  if (!play.isOut && play.bases > 0) {
    const result = advanceBases(g.bases, play.bases);
    g.bases = result.newBases;
    runsScored = result.runsScored;
  }

  // ── Score & line score ────────────────────────────────────────────────────
  if (runsScored > 0) {
    if (isTop) {
      g.awayScore += runsScored;
      g.lineScore.away[inningIdx] = (g.lineScore.away[inningIdx] || 0) + runsScored;
    } else {
      g.homeScore += runsScored;
      g.lineScore.home[inningIdx] = (g.lineScore.home[inningIdx] || 0) + runsScored;
    }
  }

  // ── Team totals ───────────────────────────────────────────────────────────
  if (!g.totals) g.totals = { home: { runs: 0, hits: 0, errors: 0 }, away: { runs: 0, hits: 0, errors: 0 } };
  const battingTotals = isTop ? g.totals.away : g.totals.home;
  const fieldingTotals = isTop ? g.totals.home : g.totals.away;
  if (play.countsAsHit) battingTotals.hits += 1;
  if (play.category === PLAY_CATEGORIES.ERROR) fieldingTotals.errors += 1;
  if (runsScored > 0) battingTotals.runs += runsScored;

  // ── Player stats ──────────────────────────────────────────────────────────
  if (!g.playerGameStats) g.playerGameStats = {};
  if (batterId) {
    const existing = g.playerGameStats[batterId] || emptyPlayerStats();
    g.playerGameStats[batterId] = updatePlayerStatsForPlay(existing, play, runsScored);
  }

  // ── Play event ────────────────────────────────────────────────────────────
  if (!g.playEvents) g.playEvents = [];
  g.playEvents.push({
    id: `ev-${g.playEvents.length + 1}-${Date.now()}`,
    gameId: g.id,
    inning: g.currentInning,
    isTop,
    playerId: batterId || null,
    code,
    description: play.description,
    outsAfter: g.outs,
    runsScored,
    timestamp: new Date().toISOString(),
  });

  // ── Advance batter index ──────────────────────────────────────────────────
  const hl = homeLineup || [];
  const al = awayLineup || [];
  if (isTop) {
    g.awayLineupIndex = al.length > 0 ? (g.awayLineupIndex + 1) % al.length : 0;
  } else {
    g.homeLineupIndex = hl.length > 0 ? (g.homeLineupIndex + 1) % hl.length : 0;
  }

  // ── Auto end half if outs >= 3 ────────────────────────────────────────────
  if (g.outs >= 3) g = endHalfInning(g);

  g.updatedAt = new Date().toISOString();
  return g;
}

// ─── Undo ─────────────────────────────────────────────────────────────────────

/**
 * Revert to the state before the last recorded play.
 * Returns the previous game state, with its own history intact.
 */
export function undoLastPlay(game) {
  if (!game.history || game.history.length === 0) return game;
  const history = [...game.history];
  const previous = history.pop();
  // Re-attach the remaining history to the snapshot
  return { ...previous, history };
}

// ─── Half-inning / game flow ──────────────────────────────────────────────────

export function endHalfInning(game) {
  const g = { ...game };
  // Make sure the inning cell shows 0 if no runs scored (not null)
  const idx = g.currentInning - 1;
  if (g.isTopInning) {
    if (g.lineScore.away[idx] === null || g.lineScore.away[idx] === undefined)
      g.lineScore = { ...g.lineScore, away: g.lineScore.away.map((v, i) => (i === idx ? 0 : v)) };
  } else {
    if (g.lineScore.home[idx] === null || g.lineScore.home[idx] === undefined)
      g.lineScore = { ...g.lineScore, home: g.lineScore.home.map((v, i) => (i === idx ? 0 : v)) };
  }

  g.outs = 0;
  g.bases = [false, false, false];
  if (g.isTopInning) {
    g.isTopInning = false;
  } else {
    g.isTopInning = true;
    g.currentInning += 1;
  }
  g.updatedAt = new Date().toISOString();
  return g;
}

/** Add a manual run for the batting team and record in lineScore. */
export function addManualRun(game) {
  const g = JSON.parse(JSON.stringify(game));
  const idx = g.currentInning - 1;
  if (g.isTopInning) {
    g.awayScore += 1;
    g.lineScore.away[idx] = (g.lineScore.away[idx] || 0) + 1;
    if (!g.totals) g.totals = { home: { runs: 0, hits: 0, errors: 0 }, away: { runs: 0, hits: 0, errors: 0 } };
    g.totals.away.runs += 1;
  } else {
    g.homeScore += 1;
    g.lineScore.home[idx] = (g.lineScore.home[idx] || 0) + 1;
    if (!g.totals) g.totals = { home: { runs: 0, hits: 0, errors: 0 }, away: { runs: 0, hits: 0, errors: 0 } };
    g.totals.home.runs += 1;
  }
  g.updatedAt = new Date().toISOString();
  return g;
}

/** Add a manual out and auto-end half if outs reaches 3. */
export function addManualOut(game) {
  const g = { ...game, outs: Math.min(game.outs + 1, 3) };
  g.updatedAt = new Date().toISOString();
  return g.outs >= 3 ? endHalfInning(g) : g;
}

/** Mark the game as finished and strip undo history (saves localStorage space). */
export function finishGame(game) {
  const now = new Date().toISOString();
  // Sync totals.runs with scores in case scores diverged (manual adjustments)
  const g = { ...game };
  if (!g.totals) g.totals = { home: { runs: 0, hits: 0, errors: 0 }, away: { runs: 0, hits: 0, errors: 0 } };
  g.totals.home.runs = g.homeScore;
  g.totals.away.runs = g.awayScore;
  // Stamp 0 on any null inning cells
  g.lineScore = {
    home: g.lineScore.home.map(v => (v === null || v === undefined ? 0 : v)),
    away: g.lineScore.away.map(v => (v === null || v === undefined ? 0 : v)),
  };
  g.status = 'final';
  g.updatedAt = now;
  g.finishedAt = now;
  g.history = []; // strip undo history to save space
  return g;
}

// ─── Utility / display helpers ────────────────────────────────────────────────

export function getTeamLabel(game, teams, side) {
  const id = side === 'home' ? game.homeTeamId : game.awayTeamId;
  const team = teams.find(t => t.id === id);
  return team ? team.shortName : side.toUpperCase();
}

export function isGameOver(game) {
  return game.status === 'final';
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-DO', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getWinner(game, teams) {
  if (game.status !== 'final') return null;
  const winnerId = game.homeScore > game.awayScore ? game.homeTeamId : game.awayTeamId;
  return teams.find(t => t.id === winnerId);
}
