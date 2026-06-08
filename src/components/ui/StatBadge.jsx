import styles from './StatBadge.module.css';

export default function StatBadge({ label, value, color }) {
  return (
    <span className={styles.badge} style={color ? { background: color + '20', color } : {}}>
      <span className={styles.val}>{value}</span>
      <span className={styles.lbl}>{label}</span>
    </span>
  );
}
