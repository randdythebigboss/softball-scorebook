import { Trophy } from 'lucide-react';
import { MOCK_TEAMS, MOCK_GAMES, MOCK_PLAYERS } from '../data/mockData';
import { formatDate, getWinner } from '../utils/gameHelpers';
import { calcAVG } from '../utils/stats';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import styles from './GameSummary.module.css';

export default function GameSummary({ onNavigate }) {
  const [completedGames] = useLocalStorage('dugout_completed_games', []);

  const realGame = completedGames && completedGames.length > 0
    ? completedGames[completedGames.length - 1]
    : null;
  const isDemo = !realGame;
  const game = realGame || MOCK_GAMES[0];

  const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
  const awayTeam  = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
  const winner = getWinner(game, MOCK_TEAMS);
  const isHomeWin = game.homeScore > game.awayScore;

  const numInnings = game.totalInnings || game.innings || 7;
  const inningsArr = Array.from({ length: numInnings }, (_, i) => i);

  // Build top performers from real game stats, falling back to season mock stats
  const topPerformers = (() => {
    if (!isDemo && game.playerGameStats && Object.keys(game.playerGameStats).length > 0) {
      return Object.entries(game.playerGameStats)
        .map(([pid, s]) => ({ player: MOCK_PLAYERS.find(p => p.id === pid), stats: s }))
        .filter(e => e.player && (e.stats.ab + e.stats.bb) > 0)
        .sort((a, b) => {
          const aAvg = a.stats.ab > 0 ? a.stats.hits / a.stats.ab : 0;
          const bAvg = b.stats.ab > 0 ? b.stats.hits / b.stats.ab : 0;
          return bAvg - aAvg;
        })
        .slice(0, 4);
    }
    // Demo fallback
    const combined = [
      ...MOCK_PLAYERS.filter(p => p.teamId === game.homeTeamId).slice(0, 2),
      ...MOCK_PLAYERS.filter(p => p.teamId === game.awayTeamId).slice(0, 2),
    ];
    return combined.map(p => ({ player: p, stats: p.stats }));
  })();

  const plays = (game.playEvents || []).slice().reverse();

  return (
    <div className={styles.page}>
      {isDemo && (
        <div className={styles.demoBanner}>
          Demo — mostrando el último juego de práctica. Completa un juego real para ver datos reales.
        </div>
      )}

      {/* Winner banner */}
      <div className={styles.winnerBanner} style={{ background: winner?.color || 'var(--color-primary)' }}>
        <Trophy size={28} />
        <div>
          <div className={styles.winnerLabel}>Ganador</div>
          <div className={styles.winnerName}>{winner?.name || 'Empate'}</div>
        </div>
        <div className={styles.finalScore}>
          <span style={{ color: isHomeWin ? 'white' : 'rgba(255,255,255,0.5)' }}>{game.homeScore}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>–</span>
          <span style={{ color: !isHomeWin ? 'white' : 'rgba(255,255,255,0.5)' }}>{game.awayScore}</span>
        </div>
      </div>

      {/* Meta */}
      <div className={styles.meta}>
        <span>{formatDate(game.date)}</span>
        <span>·</span>
        <span>{game.location}</span>
        <span>·</span>
        <span>{game.type}</span>
      </div>

      {/* Line score */}
      <SectionHeader title="Puntaje por Entradas" />
      <div className={styles.lineScoreWrap}>
        <table className={styles.lineScore}>
          <thead>
            <tr>
              <th>Equipo</th>
              {inningsArr.map(i => <th key={i}>{i + 1}</th>)}
              <th>R</th><th>H</th><th>E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.teamCell}>
                <span className={styles.dot} style={{ background: awayTeam?.color }} />
                {awayTeam?.shortName}
              </td>
              {inningsArr.map(i => <td key={i}>{game.lineScore?.away?.[i] ?? '-'}</td>)}
              <td className={styles.total}>{game.awayScore}</td>
              <td className={styles.total}>{game.totals?.away?.hits ?? '-'}</td>
              <td className={styles.total}>{game.totals?.away?.errors ?? '-'}</td>
            </tr>
            <tr>
              <td className={styles.teamCell}>
                <span className={styles.dot} style={{ background: homeTeam?.color }} />
                {homeTeam?.shortName}
              </td>
              {inningsArr.map(i => <td key={i}>{game.lineScore?.home?.[i] ?? '-'}</td>)}
              <td className={styles.total}>{game.homeScore}</td>
              <td className={styles.total}>{game.totals?.home?.hits ?? '-'}</td>
              <td className={styles.total}>{game.totals?.home?.errors ?? '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Top performers */}
      <SectionHeader title="Destacados" />
      <div className={styles.performers}>
        {topPerformers.map(({ player, stats }) => {
          if (!player) return null;
          const team = MOCK_TEAMS.find(t => t.id === player.teamId);
          const avg = calcAVG(stats.hits, stats.ab);
          return (
            <div key={player.id} className={styles.performer}>
              <div className={styles.perfAvatar} style={{ background: team?.color || 'var(--color-primary)' }}>
                {player.number}
              </div>
              <div className={styles.perfInfo}>
                <div className={styles.perfName}>{player.firstName} {player.lastName}</div>
                <div className={styles.perfStats}>
                  {stats.hits}/{stats.ab} · AVG {avg}
                  {stats.hr > 0 ? ` · ${stats.hr} HR` : ''}
                  {stats.rbi > 0 ? ` · ${stats.rbi} RBI` : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Play by play */}
      {plays.length > 0 && (
        <>
          <SectionHeader title="Jugadas" />
          <div className={styles.plays}>
            {plays.map(ev => {
              const player = MOCK_PLAYERS.find(p => p.id === ev.playerId);
              return (
                <div key={ev.id} className={styles.playRow}>
                  <span className={styles.playInning}>{ev.isTop ? '▲' : '▼'}{ev.inning}</span>
                  <span className={styles.playCode}>{ev.code}</span>
                  <span className={styles.playPlayer}>{player?.lastName || 'N/A'}</span>
                  <span className={styles.playDesc}>{ev.description}</span>
                  {ev.runsScored > 0 && <span className={styles.runs}>+{ev.runsScored}R</span>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {game.scorebookNotes && game.scorebookNotes.length > 0 && (
        <>
          <SectionHeader title="Apuntes del Juego" />
          <div className={styles.notesLog}>
            {game.scorebookNotes.map(note => (
              <div key={note.id} className={styles.noteItem}>
                <span className={styles.noteInning}>{note.isTopInning ? '▲' : '▼'}{note.inning}</span>
                <span className={styles.noteText}>{note.text}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.actions}>
        <Button onClick={() => onNavigate('home')} variant="outline">Volver al Inicio</Button>
        <Button onClick={() => onNavigate('stats')}>Ver Estadísticas</Button>
      </div>
    </div>
  );
}
