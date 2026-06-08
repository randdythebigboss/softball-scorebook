import styles from './KpiCard.module.css';

export default function KpiCard({ label, value, sub, icon: Icon, accent = false }) {
  return (
    <div className={`${styles.kpi} ${accent ? styles.accent : ''}`}>
      {Icon && <div className={styles.iconWrap}><Icon size={22} /></div>}
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{label}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  );
}
