import styles from './BasesDiamond.module.css';

export default function BasesDiamond({ bases = [false, false, false] }) {
  const [first, second, third] = bases;
  return (
    <div className={styles.diamond}>
      <div className={`${styles.base} ${styles.second} ${second ? styles.occupied : ''}`} />
      <div className={styles.row}>
        <div className={`${styles.base} ${styles.third} ${third ? styles.occupied : ''}`} />
        <div className={styles.homeplate} />
        <div className={`${styles.base} ${styles.first} ${first ? styles.occupied : ''}`} />
      </div>
      <div className={styles.labels}>
        <span>3B</span>
        <span>2B</span>
        <span>1B</span>
      </div>
    </div>
  );
}
