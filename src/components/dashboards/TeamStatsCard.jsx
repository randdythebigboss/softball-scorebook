import { calcWinPct, calcRunDiff } from '../../utils/stats';
import styles from './TeamStatsCard.module.css';

export default function TeamStatsCard({ team, onViewRoster }) {
  const { stats } = team;
  const pct = calcWinPct(stats.wins, stats.losses);
  const diff = calcRunDiff(stats.runsScored, stats.runsAllowed);

  return (
    <div className={styles.card}>
      <div className={styles.headerBar} style={{ background: team.color }} />
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.logo} style={{ background: team.color }}>
            {team.shortName}
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{team.name}</div>
            <div className={styles.city}>{team.city}</div>
            {team.isMainTeam && <span className={styles.mainBadge}>Equipo Principal</span>}
          </div>
          <div className={styles.record}>
            <span className={styles.wins}>{stats.wins}</span>
            <span className={styles.dash}>-</span>
            <span className={styles.losses}>{stats.losses}</span>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{pct}</span>
            <span className={styles.statLbl}>PCT</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>{stats.runsScored}</span>
            <span className={styles.statLbl}>Carreras</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>{stats.runsAllowed}</span>
            <span className={styles.statLbl}>Permitidas</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal} style={{ color: diff.startsWith('+') ? 'var(--color-success)' : 'var(--color-danger)' }}>
              {diff}
            </span>
            <span className={styles.statLbl}>Dif.</span>
          </div>
        </div>

        {onViewRoster && (
          <button className={styles.rosterBtn} onClick={() => onViewRoster(team.id)}>
            Ver Roster →
          </button>
        )}
      </div>
    </div>
  );
}
