import { Home, Users, User, PlusCircle, Activity, BarChart2, Settings, Trophy } from 'lucide-react';
import styles from './SideNav.module.css';

const NAV_ITEMS = [
  { id: 'home',         label: 'Inicio',       Icon: Home       },
  { id: 'teams',        label: 'Equipos',      Icon: Users      },
  { id: 'players',      label: 'Jugadores',    Icon: User       },
  { id: 'new-game',     label: 'Nuevo Juego',  Icon: PlusCircle },
  { id: 'lineup',       label: 'Alineación',   Icon: Trophy     },
  { id: 'score-game',   label: 'Puntuar',      Icon: Activity   },
  { id: 'game-summary', label: 'Resumen',      Icon: Trophy     },
  { id: 'stats',        label: 'Estadísticas', Icon: BarChart2  },
  { id: 'settings',     label: 'Configuración',Icon: Settings   },
];

export default function SideNav({ currentPage, onNavigate, isOpen }) {
  return (
    <aside className={`${styles.side} ${isOpen ? styles.open : ''}`}>
      <div className={styles.brand}>
        <div className={styles.logo}>LT</div>
        <div>
          <div className={styles.appName}>Dugout</div>
          <div className={styles.appSub}>Scorebook</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`${styles.item} ${currentPage === id ? styles.active : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        <span className={styles.version}>v1.0 · Prototipo</span>
      </div>
    </aside>
  );
}
