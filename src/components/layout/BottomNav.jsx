import { Home, Users, User, PlusCircle, Activity, BarChart2, Settings } from 'lucide-react';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { id: 'home',       label: 'Inicio',    Icon: Home        },
  { id: 'teams',      label: 'Equipos',   Icon: Users       },
  { id: 'players',    label: 'Jugadores', Icon: User        },
  { id: 'new-game',   label: 'Nuevo',     Icon: PlusCircle  },
  { id: 'score-game', label: 'Score',     Icon: Activity    },
  { id: 'stats',      label: 'Stats',     Icon: BarChart2   },
  { id: 'settings',   label: 'Config',    Icon: Settings    },
];

export default function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`${styles.item} ${currentPage === id ? styles.active : ''}`}
          onClick={() => onNavigate(id)}
          aria-label={label}
        >
          <Icon size={20} />
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export { NAV_ITEMS };
