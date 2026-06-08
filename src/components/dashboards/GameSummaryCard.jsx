import { formatDate } from '../../utils/gameHelpers';
import styles from './GameSummaryCard.module.css';

export default function GameSummaryCard({ game, homeTeam, awayTeam, onClick }) {
  const winner = game.homeScore > game.awayScore ? homeTeam : awayTeam;
  const isHomeWin = game.homeScore > game.awayScore;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.meta}>
        <span className={styles.date}>{formatDate(game.date)}</span>
        <span className={styles.type}>{game.type}</span>
        <span className={`${styles.status} ${styles[game.status]}`}>
          {game.status === 'final' ? 'Final' : game.status === 'in_progress' ? 'En curso' : 'Pendiente'}
        </span>
      </div>

      <div className={styles.matchup}>
        <div className={`${styles.team} ${isHomeWin ? '' : styles.winner}`}>
          <div className={styles.teamLogo} style={{ background: awayTeam?.color }}>{awayTeam?.shortName}</div>
          <span className={styles.teamName}>{awayTeam?.name}</span>
          <span className={`${styles.score} ${!isHomeWin ? styles.scoreWin : ''}`}>{game.awayScore}</span>
        </div>
        <div className={styles.vs}>VS</div>
        <div className={`${styles.team} ${isHomeWin ? styles.winner : ''}`}>
          <span className={`${styles.score} ${isHomeWin ? styles.scoreWin : ''}`}>{game.homeScore}</span>
          <span className={styles.teamName}>{homeTeam?.name}</span>
          <div className={styles.teamLogo} style={{ background: homeTeam?.color }}>{homeTeam?.shortName}</div>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.location}>{game.location}</span>
        {winner && <span className={styles.winnerLabel}>Ganador: {winner.shortName}</span>}
      </div>
    </div>
  );
}
