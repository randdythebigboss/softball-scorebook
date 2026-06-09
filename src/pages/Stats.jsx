import { useState } from 'react';
import { MOCK_PLAYERS, MOCK_GAMES } from '../data/mockData';
import { useTeams } from '../hooks/useTeams';
import {
  calcAVG, calcWinPct, calcRunDiff,
  buildTeamStatsFromGames, buildPlayerStatsFromGames,
} from '../utils/stats';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SectionHeader from '../components/ui/SectionHeader';
import styles from './Stats.module.css';

const TABS = ['Equipos', 'Jugadores', 'Juegos'];

export default function Stats() {
  const [tab, setTab] = useState(0);
  const [completedGames] = useLocalStorage('dugout_completed_games', []);
  const { teams } = useTeams();
  const hasRealGames = completedGames && completedGames.length > 0;
  const allGames = hasRealGames ? completedGames : MOCK_GAMES;

  return (
    <div className={styles.page}>
      <SectionHeader title="Estadísticas" />

      {!hasRealGames && (
        <div className={styles.demoBanner}>
          Demo — mostrando datos de práctica. Completa un juego para ver estadísticas reales.
        </div>
      )}

      <div className={styles.tabs}>
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && <TeamStats allGames={allGames} teams={teams} />}
      {tab === 1 && <PlayerStats allGames={allGames} teams={teams} />}
      {tab === 2 && <GameStats allGames={allGames} teams={teams} />}
    </div>
  );
}

function TeamStats({ allGames, teams }) {
  const realStats = buildTeamStatsFromGames(allGames);

  const rows = teams.map(team => {
    const real = realStats[team.id];
    const stats = real
      ? real
      : { gamesPlayed: team.stats?.gamesPlayed || 0, wins: team.stats?.wins || 0, losses: team.stats?.losses || 0, runsScored: team.stats?.runsScored || 0, runsAllowed: team.stats?.runsAllowed || 0 };
    return { ...team, computed: stats };
  }).sort((a, b) => b.computed.wins - a.computed.wins);

  return (
    <div className={styles.section}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>G</th><th>V</th><th>D</th>
              <th>PCT</th><th>CR</th><th>CP</th><th>DIF</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(team => {
              const s = team.computed;
              const diff = calcRunDiff(s.runsScored, s.runsAllowed);
              return (
                <tr key={team.id}>
                  <td className={styles.teamCell}>
                    <span className={styles.dot} style={{ background: team.color }} />
                    {team.shortName}
                  </td>
                  <td>{s.gamesPlayed}</td>
                  <td className={styles.win}>{s.wins}</td>
                  <td className={styles.loss}>{s.losses}</td>
                  <td>{calcWinPct(s.wins, s.losses)}</td>
                  <td>{s.runsScored}</td>
                  <td>{s.runsAllowed}</td>
                  <td className={diff.startsWith('+') ? styles.pos : diff.startsWith('-') ? styles.neg : ''}>{diff}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlayerStats({ allGames, teams }) {
  const [sortBy, setSortBy] = useState('avg');
  const realPlayerStats = buildPlayerStatsFromGames(allGames);

  const players = MOCK_PLAYERS.map(p => {
    const real = realPlayerStats[p.id];
    const stats = real ? real : p.stats;
    return { ...p, computed: stats };
  }).filter(p => p.computed.ab > 0);

  const sorted = [...players].sort((a, b) => {
    if (sortBy === 'avg') {
      const aAvg = a.computed.ab > 0 ? a.computed.hits / a.computed.ab : 0;
      const bAvg = b.computed.ab > 0 ? b.computed.hits / b.computed.ab : 0;
      return bAvg - aAvg;
    }
    return (b.computed[sortBy] || 0) - (a.computed[sortBy] || 0);
  });

  return (
    <div className={styles.section}>
      <div className={styles.sortRow}>
        <span className={styles.sortLabel}>Ordenar por:</span>
        {['avg','hr','rbi','hits','runs','k'].map(s => (
          <button
            key={s}
            className={`${styles.sortBtn} ${sortBy === s ? styles.sortActive : ''}`}
            onClick={() => setSortBy(s)}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th><th>Jugador</th><th>EQ</th>
              <th>G</th><th>AB</th><th>H</th>
              <th>2B</th><th>3B</th><th>HR</th>
              <th>RBI</th><th>R</th><th>BB</th><th>K</th><th>AVG</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const team = teams.find(t => t.id === p.teamId);
              const s = p.computed;
              return (
                <tr key={p.id}>
                  <td className={styles.rank}>{i + 1}</td>
                  <td className={styles.playerCell}>
                    <div className={styles.mini} style={{ background: team?.color }}>{p.number}</div>
                    <span>{p.lastName}</span>
                  </td>
                  <td>
                    <span className={styles.teamTag} style={{ background: (team?.color || '#000') + '22', color: team?.color }}>
                      {team?.shortName}
                    </span>
                  </td>
                  <td>{s.gamesPlayed}</td>
                  <td>{s.ab}</td>
                  <td>{s.hits}</td>
                  <td>{s.doubles}</td>
                  <td>{s.triples}</td>
                  <td>{s.hr}</td>
                  <td>{s.rbi}</td>
                  <td>{s.runs}</td>
                  <td>{s.bb}</td>
                  <td>{s.k}</td>
                  <td className={styles.avg}>{calcAVG(s.hits, s.ab)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GameStats({ allGames, teams }) {
  const sorted = [...allGames].sort((a, b) => b.date?.localeCompare(a.date));
  return (
    <div className={styles.section}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th><th>Local</th><th>Vis</th>
              <th>R-L</th><th>R-V</th><th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(game => {
              const home = teams.find(t => t.id === game.homeTeamId);
              const away = teams.find(t => t.id === game.awayTeamId);
              const homeWin = game.homeScore > game.awayScore;
              return (
                <tr key={game.id}>
                  <td className={styles.date}>{game.date}</td>
                  <td className={styles.teamCell}>
                    <span className={styles.dot} style={{ background: home?.color }} />
                    {home?.shortName}
                  </td>
                  <td className={styles.teamCell}>
                    <span className={styles.dot} style={{ background: away?.color }} />
                    {away?.shortName}
                  </td>
                  <td className={homeWin ? styles.win : styles.loss}>{game.homeScore}</td>
                  <td className={!homeWin ? styles.win : styles.loss}>{game.awayScore}</td>
                  <td><span className={styles.typeBadge}>{game.type}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
