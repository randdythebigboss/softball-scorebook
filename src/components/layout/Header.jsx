import { Menu } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ title, onMenuToggle }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>CV</div>
          <div className={styles.brandText}>
            <span className={styles.appName}>Centro Verón</span>
            <span className={styles.appSub}>Scorebook</span>
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Menu">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
