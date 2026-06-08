import { calcAVG } from '../../utils/stats';
import StatBadge from '../ui/StatBadge';
import styles from './PlayerStatsCard.module.css';

export default function PlayerStatsCard({ player, team, rank }) {
  const { stats } = player;
  const avg = calcAVG(stats.hits, stats.ab);

  return (
    <div className={styles.card}>
      {rank && <div className={styles.rank}>#{rank}</div>}
      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: team?.color || 'var(--color-primary)' }}>
          {player.number}
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{player.firstName} {player.lastName}</div>
          {player.nickname && <div className={styles.nick}>"{player.nickname}"</div>}
          <div className={styles.meta}>
            <span className={styles.team}>{team?.shortName}</span>
            <span className={styles.pos}>{player.position}</span>
          </div>
        </div>
        <div className={styles.avg}>{avg}</div>
      </div>
      <div className={styles.stats}>
        <StatBadge label="G" value={stats.gamesPlayed} />
        <StatBadge label="AB" value={stats.ab} />
        <StatBadge label="H" value={stats.hits} />
        <StatBadge label="2B" value={stats.doubles} />
        <StatBadge label="HR" value={stats.hr} />
        <StatBadge label="RBI" value={stats.rbi} />
        <StatBadge label="R" value={stats.runs} />
        <StatBadge label="K" value={stats.k} />
      </div>
    </div>
  );
}
