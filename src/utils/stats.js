// ─── Single-stat calculators ──────────────────────────────────────────────────

export function calcAVG(hits, ab) {
  if (!ab || ab === 0) return '.000';
  return (hits / ab).toFixed(3).replace(/^0/, '');
}

export function calcOBP(hits, bb, ab) {
  const pa = ab + bb;
  if (!pa || pa === 0) return '.000';
  return ((hits + bb) / pa).toFixed(3).replace(/^0/, '');
}

export function calcSLG(hits, doubles, triples, hr, ab) {
  if (!ab || ab === 0) return '.000';
  const tb = hits + doubles + triples * 2 + hr * 3;
  return (tb / ab).toFixed(3).replace(/^0/, '');
}

export function calcOPS(hits, doubles, triples, hr, bb, ab) {
  const obp = parseFloat('0' + calcOBP(hits, bb, ab));
  const slg = parseFloat('0' + calcSLG(hits, doubles, triples, hr, ab));
  return (obp + slg).toFixed(3).replace(/^0/, '');
}

export function calcRunDiff(runsScored, runsAllowed) {
  const diff = runsScored - runsAllowed;
  return diff > 0 ? `+${diff}` : String(diff);
}

export function calcWinPct(wins, losses) {
  const total = wins + losses;
  if (!total) return '.000';
  return (wins / total).toFixed(3).replace(/^0/, '');
}

// ─── Aggregation from completed games ────────────────────────────────────────

/**
 * Build a team-stats map { [teamId]: { gamesPlayed, wins, losses, runsScored, runsAllowed } }
 * from an array of completed game objects.
 */
export function buildTeamStatsFromGames(games) {
  const map = {};
  const ensure = (id) => {
    if (!map[id]) map[id] = { gamesPlayed: 0, wins: 0, losses: 0, runsScored: 0, runsAllowed: 0 };
  };
  games.forEach(g => {
    if (g.status !== 'final') return;
    ensure(g.homeTeamId);
    ensure(g.awayTeamId);
    map[g.homeTeamId].gamesPlayed += 1;
    map[g.awayTeamId].gamesPlayed += 1;
    map[g.homeTeamId].runsScored   += g.homeScore;
    map[g.homeTeamId].runsAllowed  += g.awayScore;
    map[g.awayTeamId].runsScored   += g.awayScore;
    map[g.awayTeamId].runsAllowed  += g.homeScore;
    if (g.homeScore > g.awayScore) {
      map[g.homeTeamId].wins   += 1;
      map[g.awayTeamId].losses += 1;
    } else if (g.awayScore > g.homeScore) {
      map[g.awayTeamId].wins   += 1;
      map[g.homeTeamId].losses += 1;
    }
  });
  return map;
}

/**
 * Build a player-stats map { [playerId]: stats } from an array of completed game objects.
 * Each game must have a `playerGameStats` map.
 */
export function buildPlayerStatsFromGames(games) {
  const map = {};
  const ensurePlayer = (id) => {
    if (!map[id]) {
      map[id] = { gamesPlayed: 0, ab: 0, hits: 0, doubles: 0, triples: 0, hr: 0, rbi: 0, runs: 0, bb: 0, k: 0 };
    }
  };
  games.forEach(g => {
    if (g.status !== 'final' || !g.playerGameStats) return;
    Object.entries(g.playerGameStats).forEach(([pid, s]) => {
      ensurePlayer(pid);
      const acc = map[pid];
      // Only count game as played if batter had at least 1 plate appearance
      if ((s.ab || 0) + (s.bb || 0) > 0) acc.gamesPlayed += 1;
      acc.ab      += s.ab      || 0;
      acc.hits    += s.hits    || 0;
      acc.doubles += s.doubles || 0;
      acc.triples += s.triples || 0;
      acc.hr      += s.hr      || 0;
      acc.rbi     += s.rbi     || 0;
      acc.runs    += s.runs    || 0;
      acc.bb      += s.bb      || 0;
      acc.k       += s.k       || 0;
    });
  });
  return map;
}

// ─── Helpers used by Home dashboard ──────────────────────────────────────────

export function aggregateTeamStats(players) {
  return players.reduce((acc, p) => ({
    gamesPlayed: Math.max(acc.gamesPlayed, p.stats.gamesPlayed),
    ab:      acc.ab      + p.stats.ab,
    hits:    acc.hits    + p.stats.hits,
    doubles: acc.doubles + p.stats.doubles,
    triples: acc.triples + p.stats.triples,
    hr:      acc.hr      + p.stats.hr,
    rbi:     acc.rbi     + p.stats.rbi,
    runs:    acc.runs    + p.stats.runs,
    bb:      acc.bb      + p.stats.bb,
    k:       acc.k       + p.stats.k,
  }), { gamesPlayed: 0, ab: 0, hits: 0, doubles: 0, triples: 0, hr: 0, rbi: 0, runs: 0, bb: 0, k: 0 });
}

export function getTopPlayers(players, stat, count = 5) {
  return [...players]
    .filter(p => p.stats.ab >= 10)
    .sort((a, b) => {
      if (stat === 'avg') return (b.stats.hits / b.stats.ab) - (a.stats.hits / a.stats.ab);
      return (b.stats[stat] || 0) - (a.stats[stat] || 0);
    })
    .slice(0, count);
}
