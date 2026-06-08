import styles from './CurrentBatterCard.module.css';

export default function CurrentBatterCard({ player, order, position, nextPlayer }) {
  if (!player) return null;
  return (
    <div className={styles.wrap}>
      <div className={styles.current}>
        <div className={styles.order}>{order}</div>
        <div className={styles.num}>#{player.number}</div>
        <div className={styles.info}>
          <div className={styles.name}>{player.firstName} <strong>{player.lastName}</strong></div>
          <div className={styles.meta}>
            {player.nickname && <span className={styles.nick}>"{player.nickname}"</span>}
            <span className={styles.pos}>{position}</span>
            <span className={styles.bats}>Bats {player.bats}</span>
          </div>
        </div>
      </div>
      {nextPlayer && (
        <div className={styles.next}>
          <span className={styles.nextLabel}>En espera:</span>
          <span className={styles.nextName}>
            {nextPlayer.order}. #{nextPlayer.player?.number} {nextPlayer.player?.firstName} {nextPlayer.player?.lastName}
          </span>
        </div>
      )}
    </div>
  );
}
