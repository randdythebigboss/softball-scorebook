import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, action }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
