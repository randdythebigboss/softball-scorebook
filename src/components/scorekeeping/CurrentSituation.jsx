import styles from './CurrentSituation.module.css';

// Unified batter + bases diamond — replaces the two separate floating cards
export default function CurrentSituation({ player, entry, nextPlayer, bases, battingTeam }) {
  const [first, second, third] = bases || [false, false, false];

  if (!player) return null;

  return (
    <div className={styles.card}>
      <div className={styles.main}>

        {/* Current batter */}
        <div className={styles.batter}>
          <span className={styles.orderBadge}>{entry?.order}</span>
          <span className={styles.jerseyNum}>#{player.number}</span>
          <div className={styles.info}>
            <div className={styles.name}>
              {player.firstName} <strong>{player.lastName}</strong>
            </div>
            <div className={styles.tags}>
              {player.nickname && <span className={styles.nick}>"{player.nickname}"</span>}
              <span className={styles.tag}>{entry?.position}</span>
              <span className={styles.tag}>Bats {player.bats}</span>
              {battingTeam && (
                <span className={`${styles.tag} ${styles.tagTeam}`}>{battingTeam.shortName}</span>
              )}
            </div>
          </div>
        </div>

        {/* Embedded mini bases diamond */}
        <div className={styles.diamond} aria-label="Estado de bases">
          <div className={`${styles.base} ${styles.second} ${second ? styles.occupied : ''}`} />
          <div className={styles.diamondRow}>
            <div className={`${styles.base} ${styles.third} ${third ? styles.occupied : ''}`} />
            <div className={styles.home} />
            <div className={`${styles.base} ${styles.first} ${first ? styles.occupied : ''}`} />
          </div>
        </div>

      </div>

      {nextPlayer && (
        <div className={styles.next}>
          <span className={styles.nextLabel}>En espera</span>
          <span className={styles.nextName}>
            {nextPlayer.order}. #{nextPlayer.player?.number} {nextPlayer.player?.lastName}
          </span>
        </div>
      )}
    </div>
  );
}
