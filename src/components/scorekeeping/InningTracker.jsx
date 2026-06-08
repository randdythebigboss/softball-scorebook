import styles from './InningTracker.module.css';

export default function InningTracker({ currentInning, totalInnings, isTop }) {
  return (
    <div className={styles.tracker}>
      <div className={styles.half}>{isTop ? '▲ Alto' : '▼ Bajo'}</div>
      <div className={styles.inning}>{currentInning}</div>
      <div className={styles.label}>de {totalInnings}</div>
    </div>
  );
}
