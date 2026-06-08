import styles from './LineupCard.module.css';

export default function LineupCard({ team, lineup, players, currentIndex }) {
  return (
    <div className={styles.card}>
      <div className={styles.header} style={{ background: team?.color || 'var(--color-primary)' }}>
        <div className={styles.teamLogo}>{team?.shortName?.slice(0, 2) || 'EQ'}</div>
        <div>
          <div className={styles.teamName}>{team?.name}</div>
          <div className={styles.sub}>Alineación</div>
        </div>
      </div>

      <div className={styles.list}>
        {lineup.map((entry, idx) => {
          const player = players.find(p => p.id === entry.playerId);
          const isCurrent = idx === currentIndex;
          return (
            <div key={idx} className={`${styles.row} ${isCurrent ? styles.active : ''}`}>
              <span className={styles.order}>{entry.order}</span>
              <span className={styles.num}>#{player?.number || '--'}</span>
              <span className={styles.name}>
                {player ? `${player.firstName} ${player.lastName}` : 'N/A'}
              </span>
              <span className={styles.pos}>{entry.position}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
